const Client = require('../models/Clients.models');

exports.autoCompleteSearch = async (req, res, next) => {
	try {
		let regex = new RegExp(req.query['term'], 'i');
		const clientFilter = Client.find(
			{ first_name: regex },
			{ id: 1, first_name: 1, last_name: 1, company_name: 1 } // To get the label to show fist and last name, key/val pairs must be specified.
		)
			.sort({ first_name: -1 })
			.sort({ last_name: -1 })
			.limit(20);
		clientFilter.exec(function(err, data) {
			let result = [];
			if (!err) {
				if (data && data.length && data.length > 0) {
					data.forEach((client) => {
						let obj = {
							id: client.id,
							label: `${client.first_name} ${client.last_name}`,

							company: client.company_name,
						};
						result.push(obj);
						console.log(obj);
					});
				}
				res.jsonp(result);
			}
		});
	} catch (error) {
		throw error;
	}
};

exports.getClient = async (req, res, next) => {
	try {
		const { first_name, last_name } = await req.query;

		const client = await Client.findOne({ first_name, last_name });
		if (!client) {
			console.log('client not found');
			res.status(404).json({ msg: 'Client not found' });
		} else {
			console.log(client);
			res.status(200).json(client);
		}
	} catch (error) {
		throw error;
	}
};
