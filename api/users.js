const express = require('express'),
      router = express.Router();
      queries = require('../db/queries');

function isValidId(req, res, next) {
  if (!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

router.get('/:id/profile', isValidId, (req, res, next) => {
  queries.getUserByID(req.params.id)
    .then(user => {
      res.json(user);
    });
});

router.get('/:id', isValidId, (req, res, next) => {
  queries.getUserProperties(req.params.id)
    .then(properties => {
      const collectionOfProperties = [];
      const propertyWithTenants = {};
      properties.forEach(property => {
        if (!propertyWithTenants[property.property_id]) {
          const propertyInstance = {
            property_id: property.property_id,
            address: property.address,
            city: property.city,
            state: property.state,
            zip_code: property.zip_code,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            square_footage: property.square_footage,
            rent_price: property.rent_price,
            image: property.image,
            tenants: []
          };
          collectionOfProperties.push(propertyInstance);
          propertyWithTenants[property.property_id] = propertyInstance;
        }

        propertyWithTenants[property.property_id].tenants.push(
          {
            firstName: property.first_name,
            lastName: property.last_name,
            email: property.email
          });
      });
      res.json(collectionOfProperties)

    });
});

router.get('/:id/property', isValidId ,(req, res) => {
    queries.getAllPropertyDetails(req.params.id)
        .then(property => {
            res.json(property);
        });
});


module.exports = router;
