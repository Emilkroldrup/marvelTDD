const express = require('express');
const bodyParser = require('body-parser');
const heroesRoutes = require('./routes/heroesRoutes');

const app = express();
app.use(bodyParser.json()); // to support JSON-encoded bodies

// Use the heroes routes
app.use('/', heroesRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Export the app for testing
module.exports = app;
