const knex = require('./knex');

module.exports = {
  getAllProperties: function() {
    return knex.select('*').from('property');
  },

  getOneProperty(id) {
    return knex('property').where('id', id).first();
  },

  getLandlordProperties(id) {
    return knex.select('*').from('tenant_property')
    .join('property', 'property_id', 'property.id').where('landlord_id', id)
    .join('account', 'tenant_id', 'account.id')
  },
}
