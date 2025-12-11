const router = require("express").Router();
const userControl = require("../controllers/userControl.js")
const auth = require("../middleware/auth.js")

router.post('/register', userControl.register);
router.get('/refresh_token', userControl.refreshtoken);
router.post('/login', userControl.login);
router.get('/logout', userControl.logout);
router.get('/information', auth, userControl.getUser);
router.patch('/addcart', auth, userControl.addCart);

module.exports = router;