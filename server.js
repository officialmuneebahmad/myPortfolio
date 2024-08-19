const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Path to the file where likes are stored
const likesFilePath = path.join(__dirname, 'likes.json');

// Middleware to serve static files
app.use(express.static(path.join(__dirname, '.')));

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to get the current like count
app.get('/like-count', (req, res) => {
    fs.readFile(likesFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading like count');
            return;
        }
        const likeCount = JSON.parse(data).likeCount || 0;
        res.json({ likeCount });
    });
});

// Endpoint to increment the like count
app.post('/like', (req, res) => {
    fs.readFile(likesFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading like count');
            return;
        }
        const likes = JSON.parse(data);
        likes.likeCount = (likes.likeCount || 0) + 1;
        fs.writeFile(likesFilePath, JSON.stringify(likes), (err) => {
            if (err) {
                res.status(500).send('Error updating like count');
                return;
            }
            res.json({ likeCount: likes.likeCount });
        });
    });
});

// Endpoint to decrement the like count
app.post('/unlike', (req, res) => {
    fs.readFile(likesFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading like count');
            return;
        }
        const likes = JSON.parse(data);
        if (likes.likeCount > 0) {
            likes.likeCount -= 1;
        }
        fs.writeFile(likesFilePath, JSON.stringify(likes), (err) => {
            if (err) {
                res.status(500).send('Error updating like count');
                return;
            }
            res.json({ likeCount: likes.likeCount });
        });
    });
});

// Initialize the likes.json file if it doesn't exist
fs.exists(likesFilePath, (exists) => {
    if (!exists) {
        fs.writeFile(likesFilePath, JSON.stringify({ likeCount: 0 }), (err) => {
            if (err) {
                console.error('Error initializing like count file:', err);
            }
        });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
