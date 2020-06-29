module.exports = {
	ensureAuth: function(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	},
	forwardAuth: function(req, res, next) {
		if (!req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/dashboard');
		}
	},
};
