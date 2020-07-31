const { model, Schema } = require('mongoose');

const TicketSchema = new Schema({
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

const Ticket = model('Ticket', TicketSchema);

module.exports = Client;
