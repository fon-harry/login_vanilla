const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    let user = req.session.user;
    if (user) {
        res.render('profile', {
            'user': user
        });
    } else  {
        res.send('User' + user)
    }
});


module.exports = router;