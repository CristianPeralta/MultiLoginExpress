var express = require('express');
var router = express.Router();
var passportFacebook = require('../auth/facebook');
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

router.get('/auth/facebook',
  passportFacebook.authenticate('facebook',{ scope: ['email']}));

router.get('/auth/facebook/callback',
  passportFacebook.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    console.log(req.user);
    return res.render('index', {'user':req.user});
  });

router.get('/favicon.ico', function(req, res, next) {
  return res.status(204);
});

module.exports = router;
