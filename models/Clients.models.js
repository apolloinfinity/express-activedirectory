const { model, Schema } = require('mongoose');

const ClientSchema = new Schema({
	first_name: String,
	last_name: String,
	email: String,
	gender: String,
	company_name: String,
	job_title: String,
	department: String,
});

const Client = model('Client', ClientSchema);

module.exports = Client;
