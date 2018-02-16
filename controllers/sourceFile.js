module.exports = function(sourceFileName){
    return sourceFileName.replace(global.rootDir,'');
}