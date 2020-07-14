const { Router } = require('express');
const router = Router();
const passport = require('passport');

const { forwardAuth } = require('../middleware/auth');
const { loginPage, login, logout } = require('../controllers/user.controller');

const opts = {
	failWithError: true,
	// failureRedirect: '/user',
	successRedirect: '/dashboard',
	failureFlash: true,
};

router.get('/', forwardAuth, loginPage);
router.post(
	'/login',
	passport.authenticate('ActiveDirectory', opts),
	(req, res) => {
		res.json(req.user);
	},
	(err, req, res, next) => {
		if (err) return res.status(401).render('login');
		res.flash('Wrong password');
	}
);
router.get('/logout', logout);

module.exports = router;
