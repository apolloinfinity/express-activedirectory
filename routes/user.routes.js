const { Router } = require('express');
const router = Router();
const passport = require('passport');

const { forwardAuth } = require('../middleware/auth');
const { loginPage, login, logout } = require('../controllers/user.controller');

const opts = {
	// failWithError: true,
	failureRedirect: '/users',
	successRedirect: '/dashboard',
	failureFlash: true,
};

router.get('/', forwardAuth, loginPage);
router.post(
	'/login',
	passport.authenticate('ActiveDirectory', opts),
	(req, res, next) => {
		next();
	},
	(err, req, res, next) => {
		req.flash('error', 'Wrong Password');
		if (err) {
			return res.status(401).render('login');
		}
	}
);
router.get('/logout', logout);

module.exports = router;
