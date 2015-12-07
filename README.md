# Demo Node.js Web Application

This is a simple [Node.js](http://nodejs.org) web application demonstrating the following features:

* Database access (using [MongoDB](http://mongodb.org) and [Mongoose](http://mongoosejs.com))
* Cross-Site-Scripting (XSS) and Cross-Site-Request-Forgery (CSRF) protection
* Secure web connections via TLS/SSL
* Session management and secure cookies
* Secure registration and login (using [bcrypt](http://en.wikipedia.org/wiki/Bcrypt) for password hashing)
* Error handling and logging (including an Apache-style access log for HTTP requests)
* Mobile first responsive design with [Bootstrap](http://www.getbootstrap.com)
* HTML templating with [Handlebars](http://www.handlebarsjs.com)
* [jQuery](http://jquery.com) for client side form validation
* Tests using [Mocha](http://mochajs.org), [Chai](http://chaijs.com) and [Zombie](http://zombie.js.org)

## Requirements

* [Node.js](http://nodejs.org)
* [MongoDB](http://mongodb.org)
* A TLS/SSL certificate

## Install

```sh
$ git clone git://github.com/mholtgraewe/nodejs-demo-app.git
$ npm install
```

**NOTE:** Please place a valid TLS/SSL certificate (`key.pem` and `cert.pem`) in the `certificate` folder before attempting to start the application.

## Start

```sh
$ npm start
```

Then visit [http://localhost/](http://localhost/)

## Tests

### Page tests

Page tests are located in the project folder under ```public/test```. To run a page test execute the following steps:

1. Set ```NODE_ENV=development```
2. Start the application (```npm start```)
3. Navigate in your browser to the URL of the page you wish to test (e.g. ```https://localhost/register```)
4. Add the parameter ```test=1``` to the query string (e.g. ```https://localhost/register?test=1```)

### Integration tests (WIP)

```sh
$ npm test
```

## License

ISC