const express = require('express'),
  router = express.Router();
  propertyQueries = require('../db/property-queries');

const knex = require('../db/knex')

function isValidId(req, res, next) {
  if (!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

// Get All Property Details for a property by ID
router.get('/:id', isValidId, (req, res) => {
  propertyQueries.getMaintenanceDocuments(req.params.id)
    .then(property => {
      res.json(property);
    });
});

router.get('/:id/tenants', isValidId, (req, res) => {
  propertyQueries.getAllTenatsByProperty(req.params.id)
    .then(property => {
      res.json(property);
    });
});

// Create a new property
router.post('/', (req, res, next) => {
  propertyQueries.createNewProperty(req.body)
    .then(property => {
      res.json(property)
    })
})

module.exports = router;
