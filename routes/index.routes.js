const { Router } = require('express');
const router = Router();

const {
	dashboard,
	clients,
	clientProfile,
} = require('../controllers/index.controller');
const { search } = require('../controllers/search.controller');
const { ensureAuth, checkGroup } = require('../middleware/auth');

router.use(ensureAuth);

router.get('/dashboard', dashboard);
router.get('/clients', checkGroup, clients);
router.get('/clients/:id', clientProfile);
router.get('/search-client/', search);

module.exports = router;
