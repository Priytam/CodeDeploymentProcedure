'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Message = mongoose.model('Message'),
  _ = require('lodash');

exports.createFromSocket = function(data, cb) {
  console.log(data);
  var message = new Message(data);
  console.log('##################################');
  console.log(data);
  message.time = new Date();
  message.save(function(err) {
    if (err)
        console.log(err);
    Message.findOne({
      _id: message._id
    }).exec(function(err, message) {
        console.log('##################################');
        console.log(err);
      return cb(message);
    });
  });
};

exports.getAllForSocket = function(cb) {
  Message.find({}).sort('time').exec(function(err, messages) {
    return cb(messages);
  });
};
