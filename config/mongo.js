module.exports = new function(){
	var data = {
		host : process.env.MONGO_HOST || 'localhost',
		port : process.env.MONGO_PORT || 27017,
		dbName: process.env.MONGO_DBNAME || 'trivia',
		options : {
			appname : process.env.APP_NAME || 'trivia app'
		}
	};
	data.url = 'mongodb://' + data.host + ':' + data.port + '/' + data.dbName;
	return data;
};