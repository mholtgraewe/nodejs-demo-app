'use strict';

let path = require('path'),
    root = path.join(__dirname, '..');

module.exports = {
    app: {
        name: 'Demo',
    },

    server: {
        http: {
            port: 80
        },
        https: {
            port: 443,
            key: path.join(root, 'certificate', 'key.pem'),
            cert: path.join(root, 'certificate', 'cert.pem')
        }
    },

    db: {
        uri: 'mongodb://localhost:27017/nodejs-demo-app',
        errorCodes: {
            duplicateKey: 11000
        }
    },

    logger: {
        exceptions: {
            filename: path.join(root, 'log', 'exceptions.log')
        },

        console: {
            timestamp: true,
            level: 'info',
            colorize: true
        },

        file: {
            filename: path.join(root, 'log', 'application.log'),
            maxsize: 5 * 1000 * 1000,
            maxFiles: 5,
            tailable: true,
            json: true,
            timestamp: true,
            level: 'info'
        },

        access: {
            filename: path.join(root, 'log', 'access-%DATE%.log'),
            date_format: 'YYYY-MM-DD',
            frequency: 'daily',
            verbose: false,
        }
    },

    middleware: {
        static: path.join(root, 'public'),

        bodyParser: {
            urlEncoded: {
                extended: false
            }
        },

        session: {
            resave: false,
            saveUninitialized: false,
            secret: 'QruRCickR6sB',
            cookie: {
                httpOnly: true,
                secure: true
            }
        }
    },

    views: {
        path: path.join(root, 'views'),
        engine: 'hbs'
    },

    bcrypt: {
        cost: 10
    }
};