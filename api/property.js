const express = require('express'),
  router = express.Router();
  propertyQueries = require('../db/property-queries');

const knex = require('../db/knex')

function isValidId(req, res, next) {
  if (!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

// Get All Property Details for a property by ID
router.get('/:id', isValidId, (req, res, next) => {
  propertyQueries.getPropertyInfo(req.params.id)
  .then(property => {
    res.json(property)
  });
});

<<<<<<< HEAD
router.get('/:id/documents', isValidId, (req, res) 
  propertyQueries.getMaintenanceDocuments(req.params.id)
=======
router.get('/:id/documents', isValidId, (req, res) => {
  propertyQueries.getDocuments(req.params.id)
>>>>>>> 613dcfd32812f4850359d0e140f8f9ddde4fb061
    .then(document => {
      res.json(document);
    });
});

router.post('/:id/documents', isValidId, (req, res) => {
  propertyQueries.createDocument(req.body)
    .then(document => {
      res.json(document);
    });
});

router.put('/:id/documents', isValidId, (req, res) => {
  propertyQueries.updateDocument(req.body)
    .then(document => {
      res.json({message: "Document updated!"});
    });
});

router.delete('/:id/documents', isValidId, (req, res) => {
  propertyQueries.deleteDocument(req.body)
    .then(document => {
      res.json({message: "Document deleted!"});
    });
});

router.get('/:id/maintenance', isValidId, (req, res) => {
  propertyQueries.getMaintenance(req.params.id)
    .then(maintenance => {
      res.json(maintenance);
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
