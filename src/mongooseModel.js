const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Users = new Schema({
   name: {
       type: String,
       required: 'Name is required'
   },
    email: {
       type: String,
        required: 'Email is required.'
    },
    username: {
       type: String,
        required: 'Username is required'
    },
    password: {
       type: String,
        required: 'Password is required'
    },
    created_date: {
       type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Users', Users);
