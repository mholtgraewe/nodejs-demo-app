'use strict';

let mongoose = require('mongoose'),
    validate = require('../utils/validate');

let schema = mongoose.Schema(
    {
        _id: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 20,
            match: /^\b\w+\b$/
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
            maxlength: 100,
            unique: true,
            validate: validate.email
        },
        password: {
            type: String,
            trim: true,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        toObject: { getters: true },
        toJSON: { getters: true }
    }
);

schema.virtual('username').get(function () {
    return this._id;
});

schema.virtual('username').set(function (value) {
    this._id = value;
});

module.exports = mongoose.model('User', schema);