const uuid = require('uuid/v1');

let users = [
    {
        'id': '1',
        'name': 'user1',
        'password': 'password'
    },
    {
        'id': '2',
        'name': 'user2',
        'password': 'password'
    },
    {
        'id': '3',
        'name': 'user3',
        'password': 'password'
    }
];

let sessions = [];

function authUser(login, password) {
    for (let userItem of users) {
        if (userItem.name === login && userItem.password === password) {
            return userItem;
        }
    }
}

function getUserFromSession(sessionId) {

    for (let sessionItem of sessions) {
        if (sessionItem.sessionId === sessionId) {
            for (let userItem of users) {
                if (userItem.id === sessionItem.userId) {
                    return userItem
                }
            }
        }

    }
}

function addSession(user) {
    let sessionId = uuid();
    sessions.push({
        'sessionId': sessionId,
        'userId': user.id
    });
    return sessionId
}

function auth(req, res, next) {
    let sessionId = req.cookies.sessionId;
    req.session = {};
    req.session.sessionId = sessionId;
    let message;
    if (sessionId) {
        let user = getUserFromSession(sessionId)
        if (user) {
            req.session.user = user;
        } else {
            message = 'You don\'t authorized'
        }
    } else {
        message = 'You don\'t have a cookie'
    }
    if (message) {
        // console.log(message);
    }

    next();
}

module.exports.authUser = authUser;
module.exports.getUserFromSession = getUserFromSession;
module.exports.addSession = addSession;
module.exports.auth = auth;

