module.exports = function (errType, message, sourceFile, line) {
	if(errType = 'err') this.err = errType;
	else if(errType = 'missing') this.missing = errType;
	this.message = message;
	this.sourceFile = sourceFile;
	this.line = line - 1;
};