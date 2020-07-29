const Client = require('../models/Clients.models');
const { deserializeUser } = require('passport');

exports.search = async (req, res, next) => {
	let regex = new RegExp(req.query['term'], 'i');
	const clientFilter = await Client.find(
		{ first_name: regex },
		{ first_name: 1 }
	)
		.sort({ first_name: -1 })
		.limit(20);
	await clientFilter.exec(function(err, data) {
		let result = [];
		if (!err) {
			if (data && data.length && data.length > 0) {
				data.forEach((client) => {
					let obj = {
						id: client._id,
						label: client.first_name,
						company: client.company,
					};
					result.push(obj);
				});
			}
			res.jsonp(result);
		}
	});
};
