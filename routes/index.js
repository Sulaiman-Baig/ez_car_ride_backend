var express = require('express');
var router = express.Router();
var multer = require('multer');

router.post("/imageUpload", function (req, res) {
upload(req, res, function (err) {
var image = req.file.filename;
res.json(image)
// Everything went fine.
})
})

router.get('/', function(req, res, next) {
res.render('index', { title: 'Express' });
});

module.exports = router;
// multar
var storage = multer.diskStorage({ //multers disk storage settings
destination: function (req, file, cb) {
cb(null, './images/')
},
filename: function (req, file, cb) {
var datetimestamp = Date.now();
cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
}
});
var upload = multer({
storage: storage
}).single('file');
