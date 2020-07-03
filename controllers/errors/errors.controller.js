exports.get401 = (req, res, next) => {
	res.status(401).render(401, {
		pageTitle: 'Unauthorized',
	});
};
