exports.dashboard = (req, res) => {
	res.render('home', {
		user: req.user,
	});
};

exports.stuffs = (req, res) => {
	res.render('stuffs');
};
