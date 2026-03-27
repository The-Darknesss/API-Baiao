const express = require('express');
const router = express.Router();
const ProductCategoryController = require('../controllers/ProductCategoryController');

router.post('/product-categories', ProductCategoryController.create);
router.get('/product-categories', ProductCategoryController.getAll);
router.get('/product-categories/:id', ProductCategoryController.getById);
router.put('/product-categories/:id', ProductCategoryController.update);
router.delete('/product-categories/:id', ProductCategoryController.delete);

module.exports = router;