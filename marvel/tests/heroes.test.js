const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Heroes API', () => {
  /**
   * Test the GET route for all heroes
   */
  describe('GET /heroes', () => {
    it('should GET all the heroes', (done) => {
      chai.request(server)
        .get('/heroes')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(5);
          done();
        });
    });
  });

  /**
   * Test the GET route for a single hero by ID
   */
  describe('GET /heroes/:id', () => {
    it('should GET a hero by the given id', (done) => {
      const heroId = 1;
      chai.request(server)
        .get(`/heroes/${heroId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eql(heroId);
          res.body.should.have.property('name');
          res.body.should.have.property('alias');
          res.body.should.have.property('powers');
          done();
        });
    });

    it('should return 404 if the hero is not found', (done) => {
      const heroId = 999;
      chai.request(server)
        .get(`/heroes/${heroId}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').eql('Hero not found');
          done();
        });
    });
  });

  /**
   * Test the POST route to create a new hero
   */
  describe('POST /heroes', () => {
    it('should POST a new hero', (done) => {
      const newHero = {
        id: 6,
        name: "Black Widow",
        alias: "Natasha Romanoff",
        powers: ["Martial arts", "Spycraft", "Agility"]
      };

      chai.request(server)
        .post('/heroes')
        .send(newHero)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eql(6);
          res.body.should.have.property('name').eql('Black Widow');
          res.body.should.have.property('alias').eql('Natasha Romanoff');
          done();
        });
    });

    it('should not POST a hero without required fields', (done) => {
      const newHero = {
        id: 7,
        alias: "Unknown Hero"
      };

      chai.request(server)
        .post('/heroes')
        .send(newHero)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').eql('Name and powers are required');
          done();
        });
    });
  });

  /**
   * Test the PUT route to update a hero by ID
   */
  describe('PUT /heroes/:id', () => {
    it('should UPDATE an existing hero', (done) => {
      const updatedHero = {
        name: "Captain America",
        alias: "Steve Rogers",
        powers: ["Super strength", "Enhanced agility", "Leadership"]
      };

      chai.request(server)
        .put('/heroes/1')
        .send(updatedHero)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name').eql('Captain America');
          res.body.should.have.property('powers').include('Leadership');
          done();
        });
    });

    it('should return 404 if the hero to update is not found', (done) => {
      const updatedHero = {
        name: "Non Existent Hero",
        alias: "Ghost",
        powers: ["Invisibility"]
      };

      chai.request(server)
        .put('/heroes/999')
        .send(updatedHero)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').eql('Hero not found');
          done();
        });
    });
  });

  /**
   * Test the DELETE route to remove a hero by ID
   */
  describe('DELETE /heroes/:id', () => {
    it('should DELETE an existing hero', (done) => {
      chai.request(server)
        .delete('/heroes/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Hero deleted');
          done();
        });
    });

    it('should return 404 if the hero to delete is not found', (done) => {
      chai.request(server)
        .delete('/heroes/999')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').eql('Hero not found');
          done();
        });
    });
  });
});
