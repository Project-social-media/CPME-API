function sendError(req, res, status, message) {
	res.status(status).send({
		error: message,
		url: req.protocol + '://' + req.get('host') + req.originalUrl,
	});
}

module.exports = sendError;
