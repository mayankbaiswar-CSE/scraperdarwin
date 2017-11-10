var mongoose = require('mongoose');

var schema = mongoose.Schema;

var imageClass = new schema({
    tag: { type: String },
    link: { type: String },
    file: { type: String }
});

module.exports = mongoose.model('Image', imageClass);
