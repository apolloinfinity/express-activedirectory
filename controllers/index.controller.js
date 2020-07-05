exports.dashboard = (req, res) => {
	res.render('home', {
		user: req.user,
		title: `Welcome ${req.user.displayName}`,
		loggedIn: true,
	});
};

exports.stuffs = (req, res) => {
	res.render('stuffs', {
		title: 'Stuffs',
		loggedIn: true,
	});
};
