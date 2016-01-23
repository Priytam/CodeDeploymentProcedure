'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Message Schema
 */

var MessageSchema = new Schema({
  user: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  time: {
    type: Date
  },
  expires: {
    type: Number
  }
});

mongoose.model('Message', MessageSchema);