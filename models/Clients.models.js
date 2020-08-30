const { model, Schema } = require('mongoose');

const ClientSchema = new Schema({
	id: Number,
	first_name: String,
	last_name: String,
	email: String,
	gender: String,
	phone: String,
	company: String,
	job_title: String,
	date_added: { type: Date },
	street_address: String,
	city: String,
	state: String,
	department: String,
	support_tickets: {
		type: Schema.Types.ObjectId,
		ref: 'Ticket',
	},
});

const Client = model('Client', ClientSchema);

module.exports = Client;

// const newas = {
// 	_id: { $oid: '5f2d9acdb3bab8063876ff39' },
// 	id: '1',
// 	first_name: 'Roldan',
// 	last_name: 'Matejovsky',
// 	email: 'rmatejovsky0@yellowbook.com',
// 	gender: 'Male',
// 	phone: '626-598-9212',
// 	company: 'Morissette LLC',
// 	job_title: 'Staff Scientist',
// 	date_added: '{"$date":"2020-01-04T09:03:28.000Z"}',
// 	street_address: '169 Butternut Street',
// 	city: 'Alhambra',
// 	state: 'California',
// 	department: 'Jewelery',
// 	support_tickets: [],
// };
