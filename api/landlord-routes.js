const express = require('express'),
      router = express.Router();
      queries = require('../db/queries');

function isValidId(req, res, next) {
  if (!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

router.get('/:id', isValidId, (req, res, next) => {
  queries.getLandlordProperties(req.params.id).then(properties => {
    if(properties) {
      res.json(properties);
    } else {
      next()
    }
  })
});






module.exports = router;
