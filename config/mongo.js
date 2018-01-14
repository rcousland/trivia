module.exports = {
	host: 'localhost',
	port: 27017,
	db: 'trivia',
	url: function() {
		return this.host + ':' + this.port + '/' + this.db;
	}
};