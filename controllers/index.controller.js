const Client = require('../models/Clients.models');

exports.dashboard = async (req, res) => {
	res.render('home', {
		user: req.user,
		title: `Home`,
		loggedIn: true,
	});
};

exports.clients = async (req, res) => {
	const clients = await Client.find({}).lean();

	try {
		// clients.map((client) => console.log(client));
		res.render('clients', {
			title: 'Clients',
			loggedIn: true,
			clients: clients,
		});
	} catch (error) {
		throw error;
	}
};

exports.clientProfile = async (req, res) => {
	try {
		const { id } = await req.params;
		const client = await Client.findOne({ _id: id }).lean();
		console.log(client);
		res.render('client-profile', {
			title: client.first_name,
			loggedIn: true,
			client: client,
		});
	} catch (error) {
		throw error;
	}
};
