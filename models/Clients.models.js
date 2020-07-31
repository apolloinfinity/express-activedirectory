const { model, Schema } = require('mongoose');

const ClientSchema = new Schema({
	id: Number,
	first_name: String,
	last_name: String,
	email: String,
	gender: String,
	company_name: String,
	job_title: String,
	department: String,
	support_tickets: Array,
});

const Client = model('Client', ClientSchema);

module.exports = Client;
