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
    const { name, alias, powers } = req.body;

    if (!name || !alias || !powers || powers.length === 0) {
        return res.status(400).json({ message: 'Name, alias, and powers are required' });
    }

    const newHero = { id: heroes.length + 1, name, alias, powers };
    heroes.push(newHero);
    res.status(201).json(newHero);
};


const updateHero = (req, res) => {
    const heroId = parseInt(req.params.id);
    const heroIndex = heroes.findIndex(h => h.id === heroId);

    if (heroIndex !== -1) {
        const updatedHero = { ...heroes[heroIndex], ...req.body };
        heroes[heroIndex] = updatedHero;
        res.status(200).json(updatedHero);
    } else {
        res.status(404).json({ message: "Hero not found" });
    }
};

const deleteHero = (req, res) => {
    const heroId = parseInt(req.params.id);
    const heroIndex = heroes.findIndex(h => h.id === heroId);

    if (heroIndex !== -1) {
        const deletedHero = heroes.splice(heroIndex, 1);
        res.status(200).json({ message: "Hero deleted", hero: deletedHero[0] });
    } else {
        res.status(404).json({ message: "Hero not found" });
    }
};

module.exports = { getHeroes, getHeroById, createHero, updateHero, deleteHero };
