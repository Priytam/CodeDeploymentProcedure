/**
 * Created by arkulkar on 12/19/2015.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Approval Schema
 */

var ApprovalSchema = new Schema({
    values: {
        type: Array,
        required: true
    },
    state: {
        type: String,
        enum : ['AskMailSend','Approved', 'NotifyMailSend'],
        default : 'AskMailSend'
    },
    name : {
        type: String,
        trim : true
    },
    plan : {
        type: String,
        trim : true
    },
    status: {
        type: String,
        enum : ['DEFINED','INPROGRESS', 'WAITING', 'FINISHED'],
        default : 'DEFINED'
    },
    type : {
        type: String,
        default : 'Approval'
    }
});

/**
 * Validations
 */
ApprovalSchema.path('values').validate(function(values) {
    return !!values;
}, 'values cannot be blank');

ApprovalSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Approval', ApprovalSchema);
