import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// GET /api/services
app.get('/api/services', (req, res) => {
    res.json(db.data.services);
});

// GET /api/portfolio
app.get('/api/portfolio', (req, res) => {
    res.json(db.data.portfolio);
});

// GET /api/testimonials
app.get('/api/testimonials', (req, res) => {
    res.json(db.data.testimonials);
});

// POST /api/contact
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const newContact = {
        id: Date.now(),
        name,
        email,
        message,
        createdAt: new Date().toISOString()
    };

    db.data.contacts.push(newContact);
    await db.write();

    res.status(201).json({ success: true, message: 'Message received' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
