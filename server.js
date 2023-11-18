const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Replace this with the path to the directory containing your files
const filesDirectory = 'C:\\Users\\Admin\\Desktop\\stored files';

// Serve static files (like your HTML, CSS, JS)
app.use(express.static('.'));

// Endpoint to list files
app.get('/list-files', (req, res) => {
    fs.readdir(filesDirectory, (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading directory');
            return;
        }
        res.json(files);
    });
});

// Endpoint to read a specific file
app.get('/files/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(filesDirectory, filename);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading file');
            return;
        }
        res.send(data);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
