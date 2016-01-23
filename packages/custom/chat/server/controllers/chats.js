'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Message = mongoose.model('Message'),
  _ = require('lodash');

exports.createFromSocket = function(data, cb) {
  var message = new Message(data);
  message.time = new Date();
  message.save(function(err) {
    if (err)
    Message.findOne({
      _id: message._id
    }).exec(function(err, message) {
      return cb(message);
    });
  });
};

exports.getAllForSocket = function(cb) {
  Message.find({}).sort('time').exec(function(err, messages) {
    return cb(messages);
  });
};
