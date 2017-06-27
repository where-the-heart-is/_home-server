const knex = require('./knex');



module.exports = {
  createProperty: (property) => {
    const {location,
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
    console.log("PONIES "+ location_id);
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






      // return knex('property').insert({
      //   address,
      //   rent_price,
      //   bedrooms,
      //   bathrooms,
      //   square_footage,
      //   image,
      //   landlord_id
      // }, '*').then(result => {
      //   console.log(result);
      //   const createdProperty = result[0];
      //
      // })
      //

    // }
