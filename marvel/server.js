const express = require('express');
const bodyParser = require('body-parser');
const heroesRoutes = require('./routes/heroesRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Swagger configuration
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Marvel Heroes API',
        version: '1.0.0',
        description: 'A simple API for managing Marvel Golden Age heroes',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
      components: {
        schemas: {
          Hero: {
            type: 'object',
            required: ['name', 'alias', 'powers'],
            properties: {
              id: {
                type: 'integer',
                description: 'The auto-generated id of the hero',
              },
              name: {
                type: 'string',
                description: 'The name of the hero',
              },
              alias: {
                type: 'string',
                description: 'The alias of the hero',
              },
              powers: {
                type: 'array',
                items: {
                  type: 'string',
                },
                description: "The hero's powers",
              },
            },
            example: {
              id: 1,
              name: 'Captain America',
              alias: 'Steve Rogers',
              powers: ['Super strength', 'Enhanced agility', 'Vibranium shield'],
            },
          },
        },
      },
    },
    apis: [path.resolve(__dirname, './routes/heroesRoutes.js')],
  };


// Initialize Swagger-jsdoc
const swaggerSpecs = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Use the heroes routes
app.use('/', heroesRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Export the app for testing
module.exports = app;
