const express = require('express');
const router = express.Router();

const auth = require('../auth');

router.get('/', function (req, res, next) {
    res.render('signin');
});

router.post('/', function (req, res, next) {
    let login = req.body.login;
    let password = req.body.password;

    user = auth.authUser(login, password);
    if (user) {
        res.cookie('sessionId', auth.addSession(user));
        res.redirect('/')
    } else {
        res.render('signin', {
            'message': 'Invalid credentials!'
        });
    }

});

module.exports = router;
