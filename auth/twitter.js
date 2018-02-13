var User = require('../models/User');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var authconfig = require('../authConfig').twitter;

var opts = {
  consumerKey : authconfig.ID,
  consumerSecret:authconfig.Secret,
  userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true",
  callbackURL:authconfig.URL
};

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new TwitterStrategy(opts,

  function(accessToken, refreshToken, profile, done) {

		User.findOne({provider_id: profile.id}, function(err, user) {
			if(err) throw(err);
			if(!err && user!= null) return done(null, user);
      let email = 'Email private';
      if (profile.hasOwnProperty('emails')) {
        email = profile.emails[0].value;
      }
			var user = new User({
				provider_id	: profile.id,
				name				: profile.displayName,
        email				: email,
				photo				: profile.photos[0].value
			});
			user.save(function(err) {
				if(err) throw err;
				done(null, user);
			});
		});
	}));


module.exports = passport;
