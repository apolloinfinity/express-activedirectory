const { Router } = require('express');
const router = Router();

const { dashboard, stuffs } = require('../controllers/index.controller');
const { ensureAuth, checkGroup } = require('../middleware/auth');

router.use(ensureAuth);
// router.use(checkGroup);

router.get('/dashboard', dashboard);
router.get('/stuffs', checkGroup, stuffs);

module.exports = router;
