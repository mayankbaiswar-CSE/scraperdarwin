var router = require('express').Router();
var uploadController = require('../controller/uploader.js');

module.exports = router;

router.post('/', uploadController.upload);
