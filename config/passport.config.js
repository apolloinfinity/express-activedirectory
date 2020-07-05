const ActiveDirectoryStrategy = require('passport-activedirectory');

const AD = require('./ad.config');
const ad = AD;

module.exports = (passport) => {
	passport.serializeUser((user, done) => {
		// console.log('userStrategy -- serialized:', user);
		done(null, user);
	});

	passport.deserializeUser((user, done) => {
		// console.log('userStrategy -- deserializeUser', user);
		done(null, user);
	});

	passport.use(
		new ActiveDirectoryStrategy(
			{
				integrated: false,
				usernameField: 'email',
				ldap: ad,
			},
			function(profile, ad, done) {
				ad.getGroupMembershipForUser(profile._json.dn, function(
					err,
					groups
				) {
					// console.log(groups);
					if (err) return done(err);
					profile.groups = groups;
					return done(null, profile);
				});
			}
		)
	);
};
