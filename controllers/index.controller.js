exports.dashboard = (req, res) => {
	res.render('home', {
		user: req.user,
		title: `Home`,
		loggedIn: true,
	});
};

exports.stuffs = (req, res) => {
	res.render('stuffs', {
		title: 'Stuffs',
		loggedIn: true,
	});
};
