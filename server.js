const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.query(`
    CREATE TABLE IF NOT EXISTS total_visits (
        id SERIAL PRIMARY KEY,
        count INTEGER DEFAULT 0
    )
`).catch(err => console.log('Table creation error:', err));

pool.query(`INSERT INTO total_visits (count) SELECT 0 WHERE NOT EXISTS (SELECT 1 FROM total_visits)`).catch(err => console.log('Insert error:', err));

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

app.get('/funzionalita', (req, res) => {
    res.sendFile(path.join(__dirname, 'funzionalita.html'));
});

app.post('/api/visit', async (req, res) => {
    try {
        await pool.query(`UPDATE total_visits SET count = count + 1`);
        const result = await pool.query(`SELECT count FROM total_visits`);
        res.json({ count: result.rows[0].count });
    } catch (err) {
        console.error('Visit error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.get('/api/visits', async (req, res) => {
    try {
        const result = await pool.query(`SELECT count FROM total_visits`);
        res.json({ count: result.rows[0]?.count || 0 });
    } catch (err) {
        console.error('Visits error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
