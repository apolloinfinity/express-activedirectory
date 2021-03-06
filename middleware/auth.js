module.exports = {
	// Checks to see if the user is authenticated
	// If not, it wil redirect to the login screen
	ensureAuth: (req, res, next) => {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/users');
		}
	},
	// Once a user is logged in and authenticated,
	// a person can't go back to the login in page
	// and gets redirected back to the dashboard
	forwardAuth: (req, res, next) => {
		if (!req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/dashboard');
		}
	},

	// TODO: will need to add users are allowed to see what once I expand the project more.
	checkGroup: async (req, res, next) => {
		let groups = req.user.groups;
		for (group of groups) {
			if ((await group.cn) === 'Technicians') {
				return res.status(403).render('403');
			}
		}
		next();
	},
	loggedIn: async (param, req, res, next) => {
		loggedIn: true;
	},
};
