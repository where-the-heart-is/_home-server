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

router.get('/:id/documents', isValidId, (req, res) => {
  propertyQueries.getDocuments(req.params.id)
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
      res.json({
        message: "Document updated!"
      });
    });
});

router.delete('/:id/documents', isValidId, (req, res) => {
  propertyQueries.deleteDocument(req.body)
    .then(document => {
      res.json({
        message: "Document deleted!"
      });
    });
});

router.get('/:id/maintenance', isValidId, (req, res) => {
  propertyQueries.getMaintenance(req.params.id)
    .then(maintenance => {
      res.json(maintenance);
    });
});

router.post('/:id/maintenance', isValidId, (req, res) => {
  propertyQueries.createMaintenance(req.body)
    .then(maintenance => {
      res.json(maintenance);
    });
});

router.put('/:id/maintenance', isValidId, (req, res) => {
  propertyQueries.updateMaintenance(req.body)
    .then(maintenance => {
      res.json({
        message: "Maintenance request completed!"
      });
    });
});

router.delete('/:id/maintenance', isValidId, (req, res) => {
  propertyQueries.deleteMaintenance(req.body)
    .then(maintenance => {
      res.json({
        message: "Maintenance request deleted!"
      });
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

router.put('/', (req, res) => {
  propertyQueries.updateProperty(req.body)
    .then(property => {
      res.json({
        message: 'Property updated!'
      })
    })
});

router.delete('/:id', isValidId, (req, res) => {
  propertyQueries.deleteProperty(req.params.id)
    .then(property => {
      res.json({
        message: "Property deleted!"
      });
    });
});

module.exports = router;
