module.exports = {
  development: {
		client:     'pg',
		connection: 'postgres://localhost/athome'
	},
  production: {
    client:     'pg',
    connection: process.env.DATABASE_URL
  }
}
