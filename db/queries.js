const knex = require('./knex');

module.exports = {
  getAllProperties: function() {
    return knex.select('*').from('property');
  },

  getOneProperty(id) {
    return knex('property').where('id', id).first();
  },

  getUserProperties(id) {
    return knex('account').where('account.id', id).select('is_landlord').first()
              .then(account => {

                if (account.is_landlord) {
                  return knex.select('*').from('tenant_property')
                          .join('property', 'property_id', 'property.id').where('landlord_id', id)
                          .join('account', 'tenant_id', 'account.id')
                          .join('location', 'location_id', 'location.id')

                } else {
                  return knex.select('*').from('tenant_property')
                          .join('property', 'property_id', 'property.id').where('tenant_id', id)
                          .join('account', 'tenant_id', 'account.id')
                          .join('location', 'location_id', 'location.id')
                }
              });


  }
}
