'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Database Schema
 */
var DBSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  host: {
    type: String,
    required: true,
    trim: true
  },
  port: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  permissions: {
    type: Array
  },
  updated: {
    type: Array
  }
});

/**
 * Validations
 */
DBSchema.path('host').validate(function(host) {
  return !!host;
}, 'host cannot be blank');

DBSchema.path('port').validate(function(port) {
  return !!port;
}, 'Port cannot be blank');

/**
 * Statics
 */
DBSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('DB', DBSchema);
