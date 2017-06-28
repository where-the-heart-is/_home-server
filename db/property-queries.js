const knex = require('./knex');

module.exports = {
  getDocuments: id => {
        return knex('documents').where('property_id', id);
      },

  createDocument: document => {
    return knex('documents').insert(document);
  },

  updateDocument: (document) => {
    return knex('documents').where('id', document.id)
            .update({
              title: document.title,
              document_url: document.document_url
            });
  },

  deleteDocument: (document) => {
    return knex('documents').where('id', document.id).del();
  },

  getMaintenance: id => {
        return knex('maintenance').where('property_id', id);
      },

  getPropertyInfo: id => {
      return knex.select('*', 'property.id as property_id').from('property').where('property.id', id)
        .join('location', 'location_id', 'location.id')
    },

  getAllTenatsByProperty: (id) => {
    return knex.select('first_name', 'last_name', 'email').from('property').where('property_id', id)
      .join('tenant_property', 'property_id', 'property.id')
      .join('account', 'tenant_id', 'account.id')
  },

  createNewProperty: property => {
    const {
      location,
      address,
      rent_price,
      bedrooms,
      bathrooms,
      square_footage,
      image,
      landlord_id
    } = property
    return knex('location').where('city', location.city)
      .andWhere('state', location.state)
      .andWhere('zip_code', location.zip_code)
      .first()
      .then(if_found => {
        if (if_found) {
          const location_id = if_found.id;
          return location_id;
        } else {
          return knex('location').insert(location)
            .then(new_location => {
              const createdLocation = new_location[0];
              const location_id = createdLocation.id;
              console.log("HELLO " + location_id);
              return location_id;
            })
        }
      }).then(location_id => {
        console.log("PONIES " + location_id);
        return knex('property').insert({
          address,
          rent_price,
          bedrooms,
          bathrooms,
          square_footage,
          image,
          landlord_id,
          location_id: location_id
        })
      })
  }


}
