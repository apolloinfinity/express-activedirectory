const passport = require('passport');

exports.loginPage = (req, res) => {
	res.render('login', {
		title: 'Login',
		loggedIn: false,
	});
};

// exports.login = (req, res, next) => {
// 	passport.authenticate('ActiveDirectory', {
// 		failWithError: true,
// 		successRedirect: '/dashboard',
// 	})(req, res, next);
// };

exports.logout = (req, res) => {
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/users');
};
