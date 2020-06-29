const { Router } = require('express');
const router = Router();

const { forwardAuth } = require('../middleware/auth');
const { loginPage, login, logout } = require('../controllers/user.controller');

router.get('/', forwardAuth, loginPage);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
