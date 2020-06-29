module.exports = {
	// Checks to see if the user is authenticated
	// If not, it wil redirect to the login screen
	ensureAuth: function(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/users');
		}
	},
	// Once a user is logged in and authenticated,
	// a person can't go back to the login in page
	// and gets redirected back to the dashboard
	forwardAuth: function(req, res, next) {
		if (!req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/dashboard');
		}
	},
};
