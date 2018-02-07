var User = require('../models/User');
var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;

var authconfig = require('../authConfig').github;

var opts = {
  clientID : authconfig.ID,
  clientSecret:authconfig.Secret,
  callbackURL:authconfig.URL,
  profileFields : ['id', 'displayName', 'photos']
};

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GithubStrategy(opts,

  function(accessToken, refreshToken, profile, done) {

		User.findOne({provider_id: profile.id}, function(err, user) {
			if(err) throw(err);
			if(!err && user!= null) return done(null, user);
			var user = new User({
				provider_id	: profile.id,
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
