module.exports = function (errType, message, sourceFile, line) {
    if(errType = 'err') this.err
    else if(errType = 'missing') this.missing
    this.message = message
    this.sourceFile = sourceFile
    this.line = line - 1
};