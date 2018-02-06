var User = require('../models/User');


module.exports.allUser = function (req,res) {
  User.find().exec(function (err,user) {
    if(err) return res.sendStatus(503);
    // return res.json(user[0]/);
    return res.render('list', {'users':user});
  })
}

module.exports.delete = function (req,res) {
  User.remove().exec(function (err,user) {
    if(err) return res.sendStatus(503);
    console.log('Usuarios eliminados');
    return res.redirect('/');
  });
}
