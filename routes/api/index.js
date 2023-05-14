const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');
//sets url to /api/categories
router.use('/categories', categoryRoutes);
//sets url to /api/products
router.use('/products', productRoutes);
//sets url to /api/tags
router.use('/tags', tagRoutes);

module.exports = router;
