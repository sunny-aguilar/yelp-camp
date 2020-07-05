// use Mongoose
const mongoose = require('mongoose');

// SCHEMA SET-UP
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

// export DB model
module.exports = mongoose.model('Campground', campgroundSchema);








