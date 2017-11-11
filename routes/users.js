var router = require('express').Router();
var userController = require('../controller/users');

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
router.get('/:name', userController.get);
router.get('/show/:name', userController.serve);
router.get('/tags/all', userController.tags);
router.post('/', userController.post);
router.put('/', userController.put);
router.delete('/', userController.del);

module.exports = router;
