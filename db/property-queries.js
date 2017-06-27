const knex = require('./knex');

module.exports = {
  getMaintenanceDocuments: id => {
    let promises = [];
    return knex('account').where('account.id', id).select('is_landlord').first()
      .then(account => {
        if (account.is_landlord) {
          return knex.select('*').from('property').where('landlord_id', id)
            .join('tenant_property', 'property.id', 'property_id')
            .join('account', 'tenant_id', 'account.id')
            .join('location', 'location_id', 'location.id')
            .then(() => {
              promises.push(knex('documents').where('property_id', id))
              promises.push(knex('maintenance').where('property_id', id))
              return Promise.all(promises).then(parsePropDocs);
            })
        } else {

        }
      });

    function parsePropDocs(docs) {
      const documents = {
        documents: docs[0][0],
        maintenance: docs[1][0]
      }
      return documents;
    }
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
