var multer = require('multer');
var uploader = {}

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

var toUpload = multer({ storage: storage }).single('image');

module.exports = uploader;

uploader.upload = upload;

function upload(req, res, next) {
  toUpload(req, res, function (err) {
    if (err) {
      res.json(err);
    } else {
      // console.log({ message: req.body.status })
      res.json(req.headers.host + '/' + req.file.path);
    }
  });
}
