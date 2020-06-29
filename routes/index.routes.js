const { Router } = require('express');
const router = Router();

const { dashboard, stuffs } = require('../controllers/index.controller');
const { ensureAuth } = require('../middleware/auth');

router.use(ensureAuth);

router.get('/dashboard', dashboard);
router.get('/stuffs', stuffs);

module.exports = router;
