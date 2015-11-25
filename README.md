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

## Requirements

* [Node.js](http://nodejs.org)
* [MongoDB](http://mongodb.org)
* A TLS/SSL certificate

## Install

```sh
$ git clone git://github.com/mholtgraewe/nodejs-demo-app.git
$ npm install
```

**NOTE:** Please place a valid TLS/SSL certificate (`key.pem` and `cert.pem`) in the `certificate` folder before attempting to start the application. Edit `config.js` in order to customize the application settings.

## Start

```sh
$ npm start
```

Then visit [http://localhost/](http://localhost/)

## License

ISC