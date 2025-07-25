const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 8000;

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Session Middleware
app.use(session({
    secret: 'best_of_the_zantech',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));

// --- Multer Storage Configurations ---
const createMulterStorage = (folderName) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            const dir = path.join(__dirname, 'uploads', folderName);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, {
                    recursive: true
                });
            }
            cb(null, dir);
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        }
    });
};

const uploadProjectImage = multer({
    storage: createMulterStorage('projectimages')
});
const uploadAmbassadorImage = multer({
    storage: createMulterStorage('ambassadors')
});


// --- Helper Functions ---
const readJsonFile = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return null;
    }
};

const writeJsonFile = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        return false;
    }
};

const deleteImageFile = (imageUrl, folderName) => {
    if (!imageUrl) return;
    try {
        const imageName = path.basename(imageUrl);
        const imagePath = path.join(__dirname, 'uploads', folderName, imageName);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    } catch (err) {
        console.error(`Error deleting image file from ${folderName}:`, err);
    }
};

// --- Auth Routes & Dashboard ---
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.post('/login', (req, res) => {
    const credentials = readJsonFile(path.join(__dirname, 'credentials.json'));
    if (credentials && req.body.email === credentials.email && req.body.password === credentials.password) {
        req.session.isLoggedIn = true;
        res.redirect('/dashboard');
    } else {
        res.redirect('/login?error=1');
    }
});
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
});
const checkAuth = (req, res, next) => req.session.isLoggedIn ? next() : res.redirect('/login');
app.get('/dashboard', checkAuth, (req, res) => res.sendFile(path.join(__dirname, 'public', 'dashboard.html')));

// --- File Paths ---
const projectsFilePath = path.join(__dirname, '..', 'src', 'data', 'projects.json');
const ambassadorsFilePath = path.join(__dirname, '..', 'src', 'data', 'ambassadors.json');
const contactsFilePath = path.join(__dirname, 'contacts.json');
const ambassadorApplicationsFilePath = path.join(__dirname, 'ambassadors.json');


// --- API: GET Endpoints ---
app.get('/api/projects', (req, res) => res.json(readJsonFile(projectsFilePath)));
app.get('/api/ambassadors', (req, res) => res.json(readJsonFile(ambassadorsFilePath)));
app.get('/api/contacts', checkAuth, (req, res) => res.json(readJsonFile(contactsFilePath)));
app.get('/api/ambassador-applications', checkAuth, (req, res) => res.json(readJsonFile(ambassadorApplicationsFilePath)));

// --- API: Frontend Form Submissions ---
app.post('/api/contact', (req, res) => {
    const contacts = readJsonFile(contactsFilePath) || [];
    const newContact = {
        id: Date.now(),
        ...req.body,
        submittedAt: new Date().toISOString()
    };
    contacts.push(newContact);
    if (writeJsonFile(contactsFilePath, contacts)) {
        res.status(200).json({
            message: 'Message received successfully!'
        });
    } else {
        res.status(500).json({
            message: 'Failed to save message.'
        });
    }
});

app.post('/api/ambassador', uploadAmbassadorImage.single('photo'), (req, res) => {
    const applications = readJsonFile(ambassadorApplicationsFilePath) || [];
    const newApplication = {
        id: Date.now(),
        name: req.body.fullName,
        email: req.body.email,
        campus: req.body.campus,
        bio: req.body.reason,
        image: req.file ? `http://localhost:${PORT}/uploads/ambassadors/${req.file.filename}` : '',
        submittedAt: new Date().toISOString()
    };
    applications.push(newApplication);
    if (writeJsonFile(ambassadorApplicationsFilePath, applications)) {
        res.status(200).json({
            message: 'Application received successfully!'
        });
    } else {
        res.status(500).json({
            message: 'Failed to save application.'
        });
    }
});


// --- API: Projects CRUD ---
app.post('/api/projects', checkAuth, uploadProjectImage.single('image'), (req, res) => {
    const projects = readJsonFile(projectsFilePath) || [];
    const newProject = {
        id: Date.now(),
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        image: req.file ? `http://localhost:${PORT}/uploads/projectimages/${req.file.filename}` : '',
        technologies: req.body.technologies.split(',').map(tech => tech.trim()),
    };
    projects.push(newProject);
    res.status(writeJsonFile(projectsFilePath, projects) ? 201 : 500).json(newProject);
});

app.put('/api/projects/:id', checkAuth, uploadProjectImage.single('image'), (req, res) => {
    let projects = readJsonFile(projectsFilePath) || [];
    const projectIndex = projects.findIndex(p => p.id == req.params.id);
    if (projectIndex === -1) return res.status(404).send('Project not found');

    const oldProject = projects[projectIndex];
    if (req.file) deleteImageFile(oldProject.image, 'projectimages');

    const updatedProject = {
        ...oldProject,
        ...req.body,
        technologies: req.body.technologies.split(',').map(tech => tech.trim()),
        image: req.file ? `http://localhost:${PORT}/uploads/projectimages/${req.file.filename}` : oldProject.image
    };
    projects[projectIndex] = updatedProject;
    res.status(writeJsonFile(projectsFilePath, projects) ? 200 : 500).json(updatedProject);
});

app.delete('/api/projects/:id', checkAuth, (req, res) => {
    let projects = readJsonFile(projectsFilePath) || [];
    const projectToDelete = projects.find(p => p.id == req.params.id);
    if (!projectToDelete) return res.status(404).send('Project not found');

    deleteImageFile(projectToDelete.image, 'projectimages');
    const updatedProjects = projects.filter(p => p.id != req.params.id);
    res.sendStatus(writeJsonFile(projectsFilePath, updatedProjects) ? 204 : 500);
});

// --- API: Ambassadors CRUD ---
app.post('/api/ambassadors', checkAuth, uploadAmbassadorImage.single('image'), (req, res) => {
    const ambassadors = readJsonFile(ambassadorsFilePath) || [];
    const newAmbassador = {
        id: Date.now(),
        name: req.body.name,
        campus: req.body.campus,
        bio: req.body.bio,
        image: req.file ? `http://localhost:${PORT}/uploads/ambassadors/${req.file.filename}` : '',
    };
    ambassadors.push(newAmbassador);
    res.status(writeJsonFile(ambassadorsFilePath, ambassadors) ? 201 : 500).json(newAmbassador);
});

app.put('/api/ambassadors/:id', checkAuth, uploadAmbassadorImage.single('image'), (req, res) => {
    let ambassadors = readJsonFile(ambassadorsFilePath) || [];
    const ambassadorIndex = ambassadors.findIndex(a => a.id == req.params.id);
    if (ambassadorIndex === -1) return res.status(404).send('Ambassador not found');

    const oldAmbassador = ambassadors[ambassadorIndex];
    if (req.file) deleteImageFile(oldAmbassador.image, 'ambassadors');

    const updatedAmbassador = {
        ...oldAmbassador,
        ...req.body,
        image: req.file ? `http://localhost:${PORT}/uploads/ambassadors/${req.file.filename}` : oldAmbassador.image
    };
    ambassadors[ambassadorIndex] = updatedAmbassador;
    res.status(writeJsonFile(ambassadorsFilePath, ambassadors) ? 200 : 500).json(updatedAmbassador);
});

app.delete('/api/ambassadors/:id', checkAuth, (req, res) => {
    let ambassadors = readJsonFile(ambassadorsFilePath) || [];
    const ambassadorToDelete = ambassadors.find(a => a.id == req.params.id);
    if (!ambassadorToDelete) return res.status(404).send('Ambassador not found');

    deleteImageFile(ambassadorToDelete.image, 'ambassadors');
    const updatedAmbassadors = ambassadors.filter(a => a.id != req.params.id);
    res.sendStatus(writeJsonFile(ambassadorsFilePath, updatedAmbassadors) ? 204 : 500);
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
    console.log(`Admin login available at http://localhost:${PORT}/login`);
});