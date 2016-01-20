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
        enum : ['ApprovalAskMailSend','WaitingForApproval', 'ApprovedAndNotified'],
        default : 'ApprovalAskMailSend'
    },
    name : {
        type: String,
        trim : true
    },
    user : {
        type: String,
        trim : true
    },
    email : {
        type: String,
        trim : true
    },
    numberOfStates : {
        type: Number,
        default : 3
    },
    currentStateNumber : {
        type: Number,
        default : 0
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
    },
    executionNumber : {
        type : Number,
        trim : true
    },
    isFirst : {
        type: Boolean,
        default : false
    },
    isLast : {
        type: Boolean,
        default : false
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
