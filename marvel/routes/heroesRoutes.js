const express = require('express');
const router = express.Router();
const heroController = require('../controllers/heroController');

// Get all heroes
router.get('/heroes', heroController.getHeroes);

// Get a specific hero by ID
router.get('/heroes/:id', heroController.getHeroById);

// Create a new hero
router.post('/heroes', heroController.createHero);

// Update an existing hero by ID
router.put('/heroes/:id', heroController.updateHero)

// Delete a hero by ID
router.delete('/heroes/:id', heroController.deleteHero)

module.exports = router;
