const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (CSS, JS, images) from 'public' folder
app.use(express.static('public'));

// Handle contact form submission
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log('📬 New contact form submission:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);
    console.log('---');
    
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Message Sent</title>
            <meta http-equiv="refresh" content="2;url=/contact.html">
            <style>
                body {
                    background: #0a0f1f;
                    color: white;
                    font-family: monospace;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
                .message {
                    text-align: center;
                    background: #111827;
                    padding: 2rem;
                    border-radius: 12px;
                    border-left: 4px solid #00d4ff;
                }
            </style>
        </head>
        <body>
            <div class="message">
                <h2>✅ Message Sent!</h2>
                <p>Thanks ${name}, I'll get back to you soon.</p>
                <p>Redirecting...</p>
            </div>
        </body>
        </html>
    `);
});

// THIS IS THE IMPORTANT FIX - Handle all HTML page routes explicitly
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/projects.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'projects.html'));
});

app.get('/about.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/contact.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Catch-all: if someone goes to a weird URL, send them to homepage
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${path.join(__dirname, 'public')}`);
});