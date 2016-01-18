/**
 * Created by pjpandey on 12/30/2015.
 */


var config = require('meanio').loadConfig(),
    mongoose = require('mongoose'),
    nodemailer = require('nodemailer'),
    async = require('async'),
    UploadDb = mongoose.model('Upload'),
    _ = require('lodash'),
    templates = require('./../../template');

module.exports =  function () {

    function processStep(id, reqId, cb) {
        getData(id, function(err , upload){
            processUploadAndNotify(upload, reqId, function(response){
                return  cb(null, response);
            });
        });
    }

    function sendMail(mailOptions, done) {
        var transport = nodemailer.createTransport(config.mailer);
        transport.sendMail(mailOptions, function(err, response) {
            if (err)
                return done(err);
            return done(null,response);
        });
    }

    function processUploadAndNotify(upload, reqId, cb) {
        async.waterfall([
                function(done) {
                    if (!upload) {
                        return done(true);
                    }
                    else if (upload.status !== 'DEFINED') {
                        return done(true);
                    }
                    return done(null);
                },
                function(done) {
                    var mailOptions = {
                        to: 'priytam.j.pandey@intel.com',
                        from: 'CDP'
                    };
                    mailOptions = templates.upload_email('pjpandey', reqId, upload._id, upload.plan,  mailOptions);
                    sendMail(mailOptions, function(err){
                        if(err)
                            return done(err)
                    });
                    done(null);
                }
            ],
            function(err) {
                var response = {
                    message: 'Notification Mail successfully sent',
                    status: 'success'
                };
                if (err) {
                    response.message = 'upload step fail' + err;
                    response.status = 'danger';
                }
                upload.status = 'FINISHED';
                upload.state = 'UploadedAndNotified';
                upload.currentStateNumber = 2;
                upload.save(function(err) {
                    if (err) {
                        response.message = 'upload step fail' + err;
                        response.status = 'danger';
                    }
                    return cb(response);
                });
            });
    }

    function getData(id , cb){
        UploadDb.findOne({_id : id}, function(err, upload) {
            if (err) {
                return cb(err);
            }
            return cb(null, upload);
        });
    }

    function update(id, step, cb) {
        getData(id, function(err, result){
            if(err){
                return cb(err);
            }
            var update = result;
            update = _.extend(update,step);
            update.save(function(err) {
                if (err) {
                    return cb(err);
                }
                cb(null, update);
            });
        });
    }

    function insert(reqData, name, done) {
        var values = [];
        values[0] = reqData.value;
        var data = {
            values : values,
            name : name,
            plan : reqData.name,
            'executionNumber': reqData.executionNumber,
            'isFirst': reqData.isFirst,
            'isLast': reqData.isLast
        };
        var upload = new UploadDb(data);
        upload.user = '';
        upload.save(function (err) {
            if (err) {
                done(err, null);
            }
            done(null, upload);
        });
    }

    return {
        processData :  processStep,
        getData : getData,
        update : update,
        insert : insert
    }
};