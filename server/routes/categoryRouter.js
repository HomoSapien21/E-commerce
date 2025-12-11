const router = require('express').Router();
const categoryControl = require('../controllers/categoryControl.js');
const auth = require('../middleware/auth.js');
const authAdmin = require('../middleware/authAdmin.js');

router.route('/category')
    .get(categoryControl.getCategory)
    .post(auth, authAdmin, categoryControl.createCategory)

router.route('/category/:id')
    .delete(auth, authAdmin, categoryControl.deleteCategory)
    .put(auth, authAdmin, categoryControl.updateCategory)

module.exports = router;