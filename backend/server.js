const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 8000;

// --- Middleware ---
app.use(cors()); // Enable CORS for your frontend
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({
    extended: true
}));

// Serve static files from the 'public' directory (for login.html, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Session Middleware
app.use(session({
    secret: 'best_of_the_zantech',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));

// --- Helper Functions to Read/Write JSON ---
const readJsonFile = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading or parsing ${path.basename(filePath)}:`, error);
        return null;
    }
};

// --- Authentication Routes ---

// Login page route (now served from backend)
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Handle login POST request
app.post('/login', (req, res) => {
    const credentials = readJsonFile(path.join(__dirname, 'credentials.json'));
    const {
        email,
        password
    } = req.body;

    if (credentials && email === credentials.email && password === credentials.password) {
        req.session.isLoggedIn = true;
        res.redirect('/dashboard');
    } else {
        res.redirect('/login?error=1');
    }
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/dashboard');
        }
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
});

// --- Protected Dashboard Route ---
const checkAuth = (req, res, next) => {
    if (req.session.isLoggedIn) {
        next(); // User is authenticated, proceed
    } else {
        res.redirect('/login');
    }
};

app.get('/dashboard', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});


// --- API Endpoints for Frontend and Dashboard ---

// Your existing data endpoints (no changes needed)
app.get('/api/projects', (req, res) => {
    res.json(readJsonFile(path.join(__dirname, '..', 'src', 'data', 'projects.json')));
});

app.get('/api/ambassadors', (req, res) => {
    res.json(readJsonFile(path.join(__dirname, '..', 'src', 'data', 'ambassadors.json')));
});

// Your existing form submission endpoints (no changes needed)
app.post('/api/contact', (req, res) => {
    console.log('Contact form data:', req.body);
    // Add logic to save data or send email
    res.status(200).json({
        message: 'Message received successfully!'
    });
});

app.post('/api/ambassador-form', (req, res) => {
    console.log('Ambassador form data:', req.body);
    // Add logic to save data
    res.status(200).json({
        message: 'Application received successfully!'
    });
});


// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
    console.log(`Admin login available at http://localhost:${PORT}/login`);
});