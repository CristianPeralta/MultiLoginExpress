//create a file called authConfig.js and paste this code with your data

var facebook = {
  ID : 'YOUR_ID',
  Secret : 'YOUR_SECRET',
  URL : 'http://localhost:3000/auth/facebook/callback'
}
var google = {
  ID:'YOUR_ID',
  Secret:'YOUR_SECRET',
  URL: 'http://localhost:3000/auth/google/callback'
}
var github = {
  ID:'YOUR_ID',
  Secret:'YOUR_SECRET',
  URL: 'http://localhost:3000/auth/github/callback'
}
//comment/
module.exports = {
  facebook,
  google,
  github
};
