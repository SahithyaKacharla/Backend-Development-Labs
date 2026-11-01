const express = require('express');

const app = express();

// GET / - Welcome route
app.get('/', (req, res) => {
res.status(200).send('Welcome to my Express Server!');
});

// GET /about - About route
app.get('/about', (req, res) => {
res.status(200).json({
name: 'Sahithya Kacharla',
section: 'AIML 1B'
});
});

// GET /time - Current date and time
app.get('/time', (req, res) => {
res.status(200).json({
currentDateTime: new Date()
});
});

// Handle unknown routes
app.use((req, res) => {
res.status(404).send('404 - Page Not Found');
});

// Start the server
app.listen(3000, () => {
console.log('Express server running at http://localhost:3000');
});
