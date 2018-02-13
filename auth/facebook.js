var User = require('../models/User');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var authconfig = require('../authConfig').facebook;

var opts = {
  clientID : authconfig.ID,
  clientSecret:authconfig.Secret,
  callbackURL:authconfig.URL,
  profileFields : ['id', 'displayName', 'photos','email']
};

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy(opts,

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
