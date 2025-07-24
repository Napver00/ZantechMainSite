const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const port = 3001;
const BASE_URL = `http://localhost:${port}`;

// --- Middleware Setup ---
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- File Paths and Directories ---
const contactsFilePath = path.join(__dirname, 'contacts.json');
const ambassadorsFilePath = path.join(__dirname, 'ambassadors.json');
const uploadsDir = path.join(__dirname, 'uploads');

// --- Ensure the 'uploads' directory exists ---
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// --- Multer Configuration for File Uploads ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

// --- Helper Functions to Read/Write JSON ---
const readJsonFile = (filePath) => {
    if (!fs.existsSync(filePath)) {
        return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    if (data.length === 0) {
        return [];
    }
    try {
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error parsing ${path.basename(filePath)}:`, error);
        return [];
    }
};

const writeJsonFile = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// --- API Endpoints ---

// Endpoint for "Get In Touch" form
app.post('/api/contact', (req, res) => {
    try {
        const contacts = readJsonFile(contactsFilePath);
        const newContact = {
            id: Date.now(),
            ...req.body,
            submittedAt: new Date().toISOString()
        };
        contacts.push(newContact);
        writeJsonFile(contactsFilePath, contacts);
        res.status(201).json({ message: 'Contact saved successfully!' });
    } catch (error) {
        console.error('Error in /api/contact:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Endpoint for "Become an Ambassador" form
app.post('/api/ambassador', upload.single('photo'), (req, res) => {
    try {
        const ambassadors = readJsonFile(ambassadorsFilePath);
        const { fullName, email, campus, reason } = req.body;

        const newAmbassador = {
            id: Date.now(),
            name: fullName,
            email,
            campus,
            bio: reason,
            // Use the BASE_URL variable to construct the image path
            image: req.file ? `${BASE_URL}/uploads/${req.file.filename}` : null,
            submittedAt: new Date().toISOString()
        };

        ambassadors.push(newAmbassador);
        writeJsonFile(ambassadorsFilePath, ambassadors);
        res.status(201).json({ message: 'Application submitted successfully!' });
    } catch (error) {
        console.error('Error in /api/ambassador:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// --- Start Server ---
app.listen(port, () => {
    console.log(`Server is running on ${BASE_URL}`);
});