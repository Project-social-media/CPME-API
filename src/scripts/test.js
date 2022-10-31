// test function with next()
const test = (req, res, next) => {
	console.log('test');
	next();
};

//export test function
module.exports = test;
