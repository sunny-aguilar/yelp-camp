// get required modules
const mongoose = require('mongoose');

const commentScheme = mongoose.Schema({
    text: String,
    author: String
});

module.exports = mongoose.model('Comment', commentScheme);