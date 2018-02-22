module.exports = (err) => {
	if(err.name == 'MongoNetworkError'){
		console.log('Unable to connect to MongoDB. Exit code 1');
		process.exit(1);
	}
	else{
		console.log(err);
	}
};