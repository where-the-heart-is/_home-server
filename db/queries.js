const knex = require('./knex');

module.exports = {
  getOne: id => {
    return knex('user').where('id', id).first();
  },
  getOneByEmail: email => {
    return knex('user').where('email', email).first()
  },
  getUserByID(id) {
    return knex.select('email', 'first_name', 'last_name').from('account').where('id', id).first();
  },
  getUserProperties(id) {
    return knex('account').where('account.id', id).select('is_landlord').first()
      .then(account => {
        if (account.is_landlord) {
          return knex.select('*', 'property.id as property_id').from('property').where('landlord_id', id)
            .join('location', 'location_id', 'location.id')
        } else {
          return knex.select('*').from('property')
            .join('tenant_property', 'property.id', 'property_id')
            .join('account', 'tenant_id', 'account.id').where('tenant_id', id)
            .join('location', 'location_id', 'location.id')
        }
    });
  }
}
