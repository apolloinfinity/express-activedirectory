const { Router } = require('express');
const router = Router();

const { dashboard, clients } = require('../controllers/index.controller');
const { ensureAuth, checkGroup } = require('../middleware/auth');

router.use(ensureAuth);

router.get('/dashboard', dashboard);
router.get('/clients', checkGroup, clients);
router.get('/clients/:id');

module.exports = router;
