// get required modules
const mongoose = require('mongoose');

const commentScheme = mongoose.Schema({
    text: String,
    author:  {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    }
});

module.exports = mongoose.model('Comment', commentScheme);