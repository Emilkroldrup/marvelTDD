const express = require('express');
const router = express.Router();
const heroController = require('../controllers/heroController');

/**
 * @swagger
 * /heroes:
 *   get:
 *     summary: Returns a list of all heroes
 *     tags: [Heroes]
 *     responses:
 *       200:
 *         description: A list of all heroes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hero'
 */
// Get all heroes
router.get('/heroes', heroController.getHeroes);

/**
 * @swagger
 * /heroes/{id}:
 *   get:
 *     summary: Get a hero by ID
 *     tags: [Heroes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The hero ID
 *     responses:
 *       200:
 *         description: The hero description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hero'
 *       404:
 *         description: Hero not found
 */
// Get a specific hero by ID
router.get('/heroes/:id', heroController.getHeroById);

/**
 * @swagger
 * /heroes:
 *   post:
 *     summary: Create a new hero
 *     tags: [Heroes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hero'
 *     responses:
 *       201:
 *         description: The hero was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hero'
 *       400:
 *         description: Bad request
 */
// Create a new hero
router.post('/heroes', heroController.createHero);

/**
 * @swagger
 * /heroes/{id}:
 *   put:
 *     summary: Update a hero by ID
 *     tags: [Heroes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The hero ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hero'
 *     responses:
 *       200:
 *         description: The hero was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hero'
 *       404:
 *         description: Hero not found
 */
// Update an existing hero by ID
router.put('/heroes/:id', heroController.updateHero);

/**
 * @swagger
 * /heroes/{id}:
 *   delete:
 *     summary: Delete a hero by ID
 *     tags: [Heroes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The hero ID
 *     responses:
 *       200:
 *         description: The hero was successfully deleted
 *       404:
 *         description: Hero not found
 */
// Delete a hero by ID
router.delete('/heroes/:id', heroController.deleteHero);

module.exports = router;
