const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email : String,
    name: String,
    description: String,
    date : String,
    price : Number,
    quantity : Number
});

module.exports = mongoose.model('ticket', userSchema, 'Tickets');