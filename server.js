const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/progetto', (req, res) => {
    res.sendFile(path.join(__dirname, 'progetto.html'));
});

app.get('/team', (req, res) => {
    res.sendFile(path.join(__dirname, 'team.html'));
});

app.get('/storia', (req, res) => {
    res.sendFile(path.join(__dirname, 'storia.html'));
});

app.get('/galleria', (req, res) => {
    res.sendFile(path.join(__dirname, 'galleria.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
