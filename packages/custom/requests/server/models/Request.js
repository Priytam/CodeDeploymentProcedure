'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var allowedCategories = [
    {
        type: Schema.ObjectId,
        ref: 'Approval'
    },
    {
        type: Schema.ObjectId,
        ref: 'Query'
    },
    {
        type: Schema.ObjectId,
        ref: 'Upload'
    }
];
/**
 * Article Schema
 */

var RequestSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum : ['DEFINED','INPROGRESS', 'WAITING', 'FINISHED'],
        default : 'DEFINED'
    },
    name : {
        type : String,
        trim : true
    },
    processedStep : {
        type : Number,
        trim : true
    },
    steps : [{
        name : {
            type: String,
            trim : true
        },
        category: {
            type: Schema.ObjectId,
            enum: allowedCategories
        },
        type: {
            type: String,
            trim: true
        }
    }]
});

/**
 * Statics
 */
RequestSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Request', RequestSchema);