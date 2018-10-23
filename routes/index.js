const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    let user = req.session.user;
    res.render('index', {user: user});

});

router.get('/logout', function (req, res, next) {
    res.clearCookie('sessionId');
    res.redirect('/');
});


module.exports = router;
