const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: String,
    type: Number
})

module.exports = mongoose.model('Review', reviewSchema)