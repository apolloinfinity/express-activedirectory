const express = require('express');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');

const { ensureAuth, forwardAuth } = require('./middleware/auth');

const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

require('./config/passport')(passport);

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

app.use('/users', require('./routes/user.routes'));
app.use('/', require('./routes/index.routes.js'));

// app.use('/', require('./routes/route'));

app.listen(PORT, console.log(`Server running on port ${PORT}`));
