var User = require('../models/User');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var authconfig = require('../authConfig');

var opts = {
  clientID : authconfig.facebookID,
  clientSecret:authconfig.facebookSecret,
  callbackURL:authconfig.facebookURL,
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

		User.findOne({facebook_id: profile.id}, function(err, user) {
			if(err) throw(err);
			if(!err && user!= null) return done(null, user);

			var user = new User({
				facebook_id	: profile.id,
				name				: profile.displayName,
        email				: profile.emails[0].value,
				photo				: profile.photos[0].value
			});
			user.save(function(err) {
				if(err) throw err;
				done(null, user);
			});
		});
	}));


module.exports = passport;
