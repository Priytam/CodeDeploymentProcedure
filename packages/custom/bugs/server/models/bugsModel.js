'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Database Schema
 */
var BugSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        trim: true,
        enum : ['open','future fix', 'closed duplicate', 'close not a bug', 'resolved'],
        default : 'open'
    },
    user: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    updated: {
        type: Array
    }
});

mongoose.model('Bug', BugSchema);
