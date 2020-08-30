const express = require('express');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const handlebars = require('express-handlebars');
const logger = require('morgan');
const flash = require('connect-flash');

const connectDB = require('./config/database.config');

dotenv.config({ path: './config/config.env' });

connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

require('./config/passport.config')(passport);

// app.set('view engine', 'ejs');
// app.set('views', 'views');
app.set('view engine', 'hbs');
app.engine(
	'hbs',
	handlebars({
		extname: 'hbs',
		layoutsDir: __dirname + '/views/layouts/',
		defaultLayout: 'layout',
		partialsDir: __dirname + '/views/partials/',
	})
);

app.use(express.static('public'));

app.use(logger('dev'));
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

app.use(flash());

// Global Variables for flash messages
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
});

app.use('/users', require('./routes/user.routes'));
app.use('/', require('./routes/index.routes.js'));

app.listen(
	PORT,
	console.log(`Server running on http://node.devops.net:${PORT}/users`)
);
