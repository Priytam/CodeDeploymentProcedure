'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var EPSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    steps : [{
        name: {
            type: String,
            required: true,
            trim: true
        },
        type : {
            type: String,
            trim: true
        },
        values : {
            type: Array,
            default: []
        },
        description: {
            type: String,
            trim: true
        },
        isMandatory: {
            type: Boolean
        },
        stepNumber : {
            type  : Number
        },
        isFirst : {
            type: Boolean,
            default : false
        },
        isLast : {
            type: Boolean,
            default : false
        }
    }]

});

/**
 * Validations
 */
EPSchema.path('name').validate(function(title) {
    return !!title;
}, 'name cannot be blank');

/*EPSchema.path('steps').validate(function(content) {
    return !!content;
}, 'at least one step is required');*/

/**
 * Statics
 */
EPSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('EPDB', EPSchema);
/**
 * Created by arkulkar on 12/19/2015.
 */
