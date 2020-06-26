const AD = require('../config/activeDirectory');

exports.login = async (req, res) => {
	const { email, password } = await req.body;

	// console.log(`${email}-${password}`)
	const ad = AD;

	try {
		await ad.authenticate(email, password, async function(err, auth) {
			if (err) {
				console.log(`Error: ${JSON.stringify(err)}`);
				return;
			}
			if (auth) {
				console.log('Authenticated');
			} else {
				console.log('Authentication Failed');
			}
		});
	} catch (error) {
		throw error;
	}
};
