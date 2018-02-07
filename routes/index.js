var express = require('express');
var router = express.Router();
var passportFacebook = require('../auth/facebook');
var passportGoogle = require('../auth/google');
var passportGithub = require('../auth/github');
var userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


router.get('/all', userController.allUser);
router.get('/user/delete', userController.delete);


router.get('/auth/github',
  passportGithub.authenticate('github',{ scope: ['email']}));

router.get('/auth/github/callback',
  passportGithub.authenticate('github', {
      failureRedirect: '/'
    }),
  function (req,res) {
    console.log(req.user);
    return res.render('index', {'user':req.user});
  });

router.get('/auth/facebook',
  passportFacebook.authenticate('facebook',{ scope: ['email']}));

router.get('/auth/facebook/callback',
  passportFacebook.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    console.log(req.user);
    return res.render('index', {'user':req.user});
  });

router.get('/auth/google',
    passportGoogle.authenticate('google', { scope : ['profile', 'email'] }));

router.get('/auth/google/callback',
    passportGoogle.authenticate('google', {
            successRedirect : '/',
            failureRedirect : '/'
    }));

router.get('/favicon.ico', function(req, res, next) {
  return res.status(204);
});

module.exports = router;
