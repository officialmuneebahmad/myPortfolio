const express = require('express');
const app = express();
const port = 3000;

let likeCount = 0; // Store like count in memory (for simplicity)

app.use(express.static('public')); // Serve static files from the public folder

// API endpoint to get the current like count
app.get('/like-count', (req, res) => {
    res.json({ likeCount: likeCount });
});

// API endpoint to increment the like count
app.post('/like', (req, res) => {
    likeCount++;
    res.json({ likeCount: likeCount });
});

// API endpoint to decrement the like count
app.post('/unlike', (req, res) => {
    if (likeCount > 0) {
        likeCount--;
    }
    res.json({ likeCount: likeCount });
});

app.listen(port, () => {
    console.log(`Like counter app listening at http://localhost:${port}`);
});
