const imageModel = require('./imageClass');

let classifier = {};
module.exports = classifier;

classifier.saveImage = (images) => {
    if (!Array.isArray(images)) {
        images = [images];
    }
    return imageModel.insertMany(images);
}

classifier.serveImages = (name) => {
    let options = { tag: name };
    return imageModel.find(options)
        .limit(15);
}

classifier.getTags = () => {
    return imageModel.find()
        .distinct('tag');
}