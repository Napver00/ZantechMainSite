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

// --- Multer Storage Configuration ---
const projectImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, 'uploads', 'projectimages');
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
const uploadProjectImage = multer({
    storage: projectImageStorage
});

// --- Helper Functions ---
const readJsonFile = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading or parsing ${path.basename(filePath)}:`, error);
        return null;
    }
};

const writeJsonFile = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error(`Error writing to ${path.basename(filePath)}:`, error);
        return false;
    }
};

const deleteImageFile = (imageUrl) => {
    if (!imageUrl) return;
    try {
        const imageName = path.basename(imageUrl);
        const imagePath = path.join(__dirname, 'uploads', 'projectimages', imageName);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    } catch (err) {
        console.error("Error deleting image file:", err);
    }
};

// --- Auth Routes ---
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

// --- API Endpoints ---
const projectsFilePath = path.join(__dirname, '..', 'src', 'data', 'projects.json');
app.get('/api/projects', (req, res) => res.json(readJsonFile(projectsFilePath)));
app.get('/api/ambassadors', (req, res) => res.json(readJsonFile(path.join(__dirname, '..', 'src', 'data', 'ambassadors.json'))));

// CREATE Project
app.post('/api/projects', uploadProjectImage.single('image'), (req, res) => {
    const projects = readJsonFile(projectsFilePath) || [];
    const newProject = {
        id: Date.now(),
        title: req.body.title,
        description: req.body.description,
        image: req.file ? `http://localhost:${PORT}/uploads/projectimages/${req.file.filename}` : '',
        technologies: req.body.technologies.split(',').map(tech => tech.trim()),
        status: req.body.status
    };
    projects.push(newProject);
    if (writeJsonFile(projectsFilePath, projects)) {
        res.status(201).json(newProject);
    } else {
        res.status(500).send('Error saving project');
    }
});

// UPDATE Project
app.put('/api/projects/:id', uploadProjectImage.single('image'), (req, res) => {
    let projects = readJsonFile(projectsFilePath) || [];
    const projectId = parseInt(req.params.id, 10);
    const projectIndex = projects.findIndex(p => p.id === projectId);

    if (projectIndex === -1) return res.status(404).send('Project not found');

    const oldProject = projects[projectIndex];
    if (req.file) {
        deleteImageFile(oldProject.image);
    }

    const updatedProject = {
        ...oldProject,
        title: req.body.title || oldProject.title,
        description: req.body.description || oldProject.description,
        technologies: req.body.technologies ? req.body.technologies.split(',').map(tech => tech.trim()) : oldProject.technologies,
        status: req.body.status || oldProject.status,
        image: req.file ? `http://localhost:${PORT}/uploads/projectimages/${req.file.filename}` : oldProject.image
    };
    projects[projectIndex] = updatedProject;

    if (writeJsonFile(projectsFilePath, projects)) {
        res.json(updatedProject);
    } else {
        res.status(500).send('Error updating project');
    }
});

// DELETE Project
app.delete('/api/projects/:id', (req, res) => {
    let projects = readJsonFile(projectsFilePath) || [];
    const projectId = parseInt(req.params.id, 10);
    const projectToDelete = projects.find(p => p.id === projectId);

    if (!projectToDelete) return res.status(404).send('Project not found');

    deleteImageFile(projectToDelete.image);

    const updatedProjects = projects.filter(p => p.id !== projectId);
    if (writeJsonFile(projectsFilePath, updatedProjects)) {
        res.status(204).send();
    } else {
        res.status(500).send('Error deleting project');
    }
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
    console.log(`Admin login available at http://localhost:${PORT}/login`);
});