const { Router } = require('express');
const router = Router();
const passport = require('passport');

router.get('/login', (req, res) => {
	res.render('login');
});

const opts = { failWithError: true };
router.post(
	'/login',
	passport.authenticate('ActiveDirectory', opts),
	function(req, res) {
		res.json(req.user);
	},
	function(err) {
		res.status(401).send('Not Authenticated');
	}
);

router.get('/dashboard', (req, res) => {
	if (req.isAuthenticated()) {
		res.render('home', {
			user: req.user,
		});
	}
});

router.get('/logout', (req, res) => {
	req.logOut();
	req.redirect('/login');
});
module.exports = router;
