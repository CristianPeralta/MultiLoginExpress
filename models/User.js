var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name				: String,
	facebook_id : {type: String, unique: true},
	photo			 : String,
  email			 : String,
	createdAt	 : {type: Date, default: Date.now}
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
