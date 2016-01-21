'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Database Schema
 */
var FeatureSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        trim: true,
        enum : ['open', 'closed duplicate', 'closed'],
        default : 'open'
    },
    justification: {
        type: String,
        required: true,
        trim: true
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

mongoose.model('Feature', FeatureSchema);
