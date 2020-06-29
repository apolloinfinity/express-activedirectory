const ActiveDirectoryStrategy = require('passport-activedirectory');
const ActiveDirectory = require('activedirectory');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const config = {
	url: process.env.AD_HOST,
	baseDN: 'dc=devops,dc=net',
	username: process.env.AD_USER,
	password: process.env.AD_PASS,
};

const ad = new ActiveDirectory(config);

module.exports = (passport) => {
	passport.serializeUser((user, done) => {
		console.log('userStrategy -- serialized:', user);
		done(null, user);
	});

	passport.deserializeUser((user, done) => {
		console.log('userStrategy -- deserializeUser', user);
		done(null, user);
	});
	passport.use(
		new ActiveDirectoryStrategy(
			{
				integrated: false,
				usernameField: 'email',
				// passwordField: 'password',
				// passReqToCallback: true,
				ldap: ad,
			},
			function(profile, ad, done) {
				ad.isUserMemberOf(profile._json.dn, 'SuperUsers', function(
					err,
					isMember
				) {
					console.log(`isMember: ${isMember}`);
					if (err) return done(err);
					return done(null, profile);
				});
			}
		)
	);
};
