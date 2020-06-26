const { Router } = require('express');
const router = Router();

const {login} = require('../controllers/auth.controllers');

router.get('/', (req, res) => {
    res.render('login');
})

router.post('/login', login );

module.exports = router;