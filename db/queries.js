const knex = require('./knex');

module.exports = {
  getAllProperties: function() {
    return knex.select('*').from('property');
  },

  getOneProperty(id) {
    return knex('property').where('id', id).first();
  }
}
