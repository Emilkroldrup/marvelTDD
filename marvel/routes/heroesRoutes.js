const express = require('express');
const router = express.Router();
let heroesData = require('../heroes.json');

// Get all heroes
router.get('/heroes', (req, res) => {
    res.status(200).json(heroesData);
});

// Get a specific hero by ID
router.get('/heroes/:id', (req, res) => {
    const hero = heroesData.find(h => h.id === parseInt(req.params.id));
    if (hero) {
        res.status(200).json(hero);
    } else {
        res.status(404).json({ message: "Hero not found" });
    }
});

// Create a new hero
router.post('/heroes', (req, res) => {
    const { id, name, alias, powers } = req.body;

    if (!name || !alias || !powers) {
        return res.status(400).json({ message: "Name, alias, and powers are required" });
    }

    const newHero = { id, name, alias, powers };
    heroesData.push(newHero);
    res.status(201).json(newHero);
});

// Update an existing hero by ID
router.put('/heroes/:id', (req, res) => {
    const { name, alias, powers } = req.body;
    const heroIndex = heroesData.findIndex(h => h.id === parseInt(req.params.id));

    if (heroIndex === -1) {
        return res.status(404).json({ message: "Hero not found" });
    }

    if (!name || !alias || !powers) {
        return res.status(400).json({ message: "Name, alias, and powers are required" });
    }

    heroesData[heroIndex] = { ...heroesData[heroIndex], name, alias, powers };
    res.status(200).json(heroesData[heroIndex]);
});

// Delete a hero by ID
router.delete('/heroes/:id', (req, res) => {
    const heroIndex = heroesData.findIndex(h => h.id === parseInt(req.params.id));

    if (heroIndex === -1) {
        return res.status(404).json({ message: "Hero not found" });
    }

    heroesData.splice(heroIndex, 1);
    res.status(200).json({ message: "Hero deleted" });
});

module.exports = router;
