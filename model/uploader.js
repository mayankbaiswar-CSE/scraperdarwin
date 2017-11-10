var mongoose = require('mongoose');

var schema = mongoose.Schema;

var uploadSchema = new schema({
    name: String,
    telephone: Number,
    email: { type: String, unique: true }
});

module.exports = mongoose.model('User', uploadSchema);
