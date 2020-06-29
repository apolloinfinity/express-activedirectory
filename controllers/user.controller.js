const passport = require('passport');

exports.loginPage = (req, res) => {
	res.render('login');
};

exports.login = (req, res, next) => {
	passport.authenticate('ActiveDirectory', {
		failWithError: true,
		successRedirect: '/dashboard',
		failureRedirect: '/users/login',
	})(req, res, next);
};

exports.logout = (req, res) => {
	req.logout();
	res.redirect('/users');
};
