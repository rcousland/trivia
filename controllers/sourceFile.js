module.exports = (sourceFileName) => {
	return sourceFileName.replace(global.rootDir,'');
};