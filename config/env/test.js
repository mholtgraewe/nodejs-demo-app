'use strict';

module.exports = {
    server: {
        http: {
            port: 3000,
        },
        https: {
            isEnabled: false
        }
    },

    db: {
        uri: 'mongodb://localhost:27017/nodejs-demo-app-test'
    },

    middleware: {
        session: {
            cookie: {
                secure: false
            }
        }
    },

    bcrypt: {
        cost: 1
    }
};