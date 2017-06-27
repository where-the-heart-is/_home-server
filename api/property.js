const express = require('express'),
      router = express.Router();
      propertyQueries = require('../db/property-queries');

const knex = require('../db/knex')

function isValidId(req, res, next) {
  if (!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

router.post('/', (req, res, next) => {
  propertyQueries
  .createProperty(req.body)
  .then(property => {
    res.json(property)
  })
})

module.exports = router;
