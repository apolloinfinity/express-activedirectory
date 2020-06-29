const express = require('express');
const session = require('express-session');
const passport = require('passport');
const ADStrategy = require('passport-activedirectory');
const dotenv = require('dotenv');

const { ensureAuth, forwardAuth } = require('./middleware/auth');

const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setting up Express session
app.use(
	session({
		secret: 'secret',
		resave: false,
		saveUninitialized: false,
		cookie: { secure: false, expires: 60000, maxAge: null },
	})
);

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
// app.use('/', require('./routes/route'));
let opts = {
	failWithError: true,
	successRedirect: '/dashboard',
	failureRedirect: '/login',
};

app.get('/login', forwardAuth, (req, res) => {
	res.render('login');
});

app.post('/login', (req, res, next) => {
	passport.authenticate('ActiveDirectory', opts)(req, res, next);
});

app.get('/dashboard', ensureAuth, (req, res) => {
	res.render('home', {
		user: req.user,
	});
});

app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/login');
});

app.listen(PORT, console.log(`Server running on port ${PORT}`));
