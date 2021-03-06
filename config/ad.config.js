const ActiveDirectory = require('activedirectory');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

const config = {
	url: process.env.AD_HOST,
	baseDN: process.env.AD_BASEDN,
	username: process.env.AD_USER,
	password: process.env.AD_PASS,
};

const AD = new ActiveDirectory(config);

module.exports = AD;
