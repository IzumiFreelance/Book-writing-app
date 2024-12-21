const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the public directory

// Endpoint to save books
app.post('/save', (req, res) => {
    const bookData = req.body;

    // Read existing books from books.json
    fs.readFile(path.join(__dirname, 'books.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }

        let books = [];
        if (data) {
            books = JSON.parse(data);
        }

        // Add new book
        books.push(bookData);

        // Write updated books back to books.json
        fs.writeFile(path.join(__dirname, 'books.json'), JSON.stringify(books, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error writing file');
            }
            res.status(200).send('Book saved successfully!');
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
