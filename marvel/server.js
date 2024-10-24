const heroes = require('../heroes.json');

const getHeroes = (req, res) => {
    res.status(200).json(heroes);
};

const getHeroById = (req, res) => {
    const hero = heroes.find(h => h.id === parseInt(req.params.id));
    if (hero) {
        res.status(200).json(hero);
    } else {
        res.status(404).json({ message: "Hero not found" });
    }
};

const createHero = (req, res) => {
    const newHero = req.body;
    heroes.push(newHero);
    res.status(201).json(newHero);
};

// Similarly, implement updateHero and deleteHero
module.exports = { getHeroes, getHeroById, createHero };
