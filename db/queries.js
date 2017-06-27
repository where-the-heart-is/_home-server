const knex = require( './knex' );

module.exports = {
	getUserByID: function ( id ) {
		return knex.select( 'email', 'first_name', 'last_name' ).from( 'account' ).where( 'account.id', id ).first();
	},
	getUserProperties( id ) {
		return knex( 'account' ).where( 'account.id', id ).select( 'is_landlord' ).first()
			.then( account => {
				if( account.is_landlord ) {
					return knex.select( '*' ).from( 'tenant_property' )
						.join( 'property', 'property_id', 'property.id' ).where( 'landlord_id', id )
						.join( 'account', 'tenant_id', 'account.id' )
						.join( 'location', 'location_id', 'location.id' )
				} else {
					return knex.select( '*' ).from( 'tenant_property' )
						.join( 'property', 'property_id', 'property.id' ).where( 'tenant_id', id )
						.join( 'account', 'tenant_id', 'account.id' )
						.join( 'location', 'location_id', 'location.id' )
				}
			} );
	},
	getAllPropertyDetails( id ) {
		let promises = [];
		function parsePropDocs( docs ) {
			const documents = {
				documents: docs[ 0 ][ 0 ],
				maintenance: docs[ 1 ][ 0 ]
			}
			return documents;
		}
		return knex( 'account' ).where( 'account.id', id ).select( 'is_landlord' ).first()
			.then( account => {
				if( account.is_landlord ) {
					return knex.select( '*' ).from( 'tenant_property' )
						.join( 'property', 'property_id', 'property.id' ).where( 'landlord_id', id )
						.join( 'account', 'tenant_id', 'account.id' )
						.join( 'location', 'location_id', 'location.id' )
						.then( () => {
							promises.push( knex( 'documents' ).where( 'property_id', id ) )
							promises.push( knex( 'maintenance' ).where( 'property_id', id ))
							return Promise.all( promises ).then( parsePropDocs );
						} )
				}
			} );
	}
}