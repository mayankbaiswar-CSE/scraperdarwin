var router = require('express').Router();
var userController = require('../controller/users');

router.get('/:name', userController.get);
router.get('/show/:name', userController.serve);
router.get('/tags/all', userController.tags);
router.post('/', userController.post);
router.put('/', userController.put);
router.delete('/', userController.del);

module.exports = router;
