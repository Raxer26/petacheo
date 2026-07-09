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
    CREATE TABLE IF NOT EXISTS page_visits (
        id SERIAL PRIMARY KEY,
        page_name VARCHAR(50) UNIQUE NOT NULL,
        visit_count INTEGER DEFAULT 0,
        last_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`).catch(err => console.log('Table creation error:', err));

const pages = ['home', 'team', 'galleria', 'progetto', 'storia', 'funzionalita', 'battaglia'];
pages.forEach(page => {
    pool.query(
        `INSERT INTO page_visits (page_name, visit_count) VALUES ($1, 0) ON CONFLICT DO NOTHING`,
        [page]
    ).catch(err => console.log('Insert error:', err));
});

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

app.post('/api/visit/:page', async (req, res) => {
    const { page } = req.params;
    try {
        await pool.query(
            `INSERT INTO page_visits (page_name, visit_count) 
             VALUES ($1, 1) 
             ON CONFLICT (page_name) 
             DO UPDATE SET 
                visit_count = page_visits.visit_count + 1,
                last_visit = CURRENT_TIMESTAMP`,
            [page]
        );
        res.json({ success: true });
    } catch (err) {
        console.error('Visit error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.get('/api/stats', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM page_visits ORDER BY visit_count DESC');
        const totalResult = await pool.query('SELECT SUM(visit_count) as total FROM page_visits');
        res.json({
            pages: result.rows,
            total: totalResult.rows[0].total || 0
        });
    } catch (err) {
        console.error('Stats error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
