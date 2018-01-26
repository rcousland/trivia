module.exports = {
	host: process.env.MONGO_HOST || 'localhost',
	port: process.env.MONGO_PORT || 27017,
	db: process.env.MONGO_DB || 'trivia',
	options: {
		autoReconnect: true,
		reconnectTries: 30,
		reconnectInterval: 1000
	},
	url: function() {
		return this.host + ':' + this.port + '/' + this.db;
	}
};