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
 * Upload Schema
 */

var UploadSchema = new Schema({
    values: {
        type: Array,
        required: true
    },
    state: {
        type: String,
        enum : ['UploadMailAndNotify','UploadedAndNotified'],
        default : 'UploadMailAndNotify'
    },
    name : {
        type: String,
        trim : true
    },
    user : {
        type: String,
        trim : true
    },
    isNext : {
        type: Boolean,
        default : false
    },
    email : {
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
        default : 'Upload'
    },
    numberOfStates : {
        type: Number,
        default : 2
    },
    currentStateNumber : {
        type: Number,
        default : 0
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
UploadSchema.path('values').validate(function(values) {
    return !!values;
}, 'values cannot be blank');

UploadSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Upload', UploadSchema);
