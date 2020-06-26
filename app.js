const express = require('express');
const dotenv = require('dotenv');

const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', require('./routes/auth.routes'))

app.listen(PORT, console.log(`Server running on port ${PORT}`));