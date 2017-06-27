const knex = require('./knex');



module.exports = {
  createProperty(property) {
    return knex('property').insert({
      address: property.address,
      rent_price: property.rent_price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      square_footage: property.square_footage,
      image: property.image,
      landlord_id: property.landlord_id,
      location_id: property.location_id
    }, '*');
  }
}
