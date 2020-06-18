var express = require('express');
var router = express.Router();
const categoryController = require('../controllers/category');


router.post('/create', categoryController.createCategory );
router.post('/update/:id', categoryController.updateCategory );
router.post('/delete/:id', categoryController.deleteCategory );
router.get('/get/:id', categoryController.getCategory );
router.get('/getall', categoryController.getAllCategories );



module.exports = router;