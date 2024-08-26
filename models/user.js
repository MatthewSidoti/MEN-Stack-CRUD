///////////////////////////////////////////////
//////// User model                   ///////// 
///////////////////////////////////////////////

const mongoose = require('./connection');

const UserSchema = new mongoose.Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
});

const Users = mongoose.model('user', UserSchema);

module.exports = Users;

// username: 'david'
// password: 'qwerty'

// npm install bcryptjs express-session connect-mongo
// bcryptjs: package that encrypts passwords-not encryptring is against rules

// express-session middleware for creating session cookies
// this determines if we are logged in or not with the precense of valid cookies'

// connect-mong: allows express session to save data in our mongo db
