/**
 * Created by pjpandey on 12/26/2015.
 */
'use strict'

var config = require('meanio').loadConfig(),
    mongoose = require('mongoose'),
    nodemailer = require('nodemailer'),
    async = require('async'),
    ApprovalDB = mongoose.model('Request'),
    templates = require('./template');


module.exports = function() {

    function processApproval(approval, done) {
        var state = approval.state;
        console.log(state);
        switch (state) {
            case 'AskMailSend':
                done(processAskMailSend(approval));
                break;
            case 'Approved':
                return processApproved;
                break;
            case 'NotifyMailSend':
               return  processNotifyMailSend;
               break;
        }
        return  null;
    }

    function sendMail(mailOptions, done) {
        var transport = nodemailer.createTransport(config.mailer);
        transport.sendMail(mailOptions, function(err, response) {
            if (err)
                done(err);
            return done(null,response);
        });
    }

    function processAskMailSend(approval, req) {
        console.log('async');
        async.waterfall([
                function(done) {
                    if (!approval) {
                        return done(true);
                    }
                    else if (approval.status !== 'DEFINED') {
                        return done(true);
                    }
                    done(null);
                },
                function(done) {
                    var mailOptions = {
                        to: 'priytam.j.pandey@intel.com',
                        from: 'CDP'
                    };
                    mailOptions = templates.forgot_password_email('pjpandey', req, approval._id, mailOptions);
                    sendMail(mailOptions, function(err, result){
                        if(err)
                            return done(err)
                    });
                    done(null);
                }
            ],
            function(err) {
                var response = {
                    message: 'Approval Mail successfully sent',
                    status: 'success'
                };
                if (err) {
                    response.message = 'Approval step fail' + err;
                    response.status = 'danger';
                }
                console.log(approval);
                approval.status = 'INPROGRESS';
                approval.state = 'Approved';
                approval.save(function(err) {
                    if (err) {
                        response.message = 'Approval step fail' + err;
                        response.status = 'danger';
                    }
                });
                console.log(response);
                return response;
            });
    }

    function processApproved() {

    }

    function processNotifyMailSend() {

    }


    return {
        processApproval : processApproval
    }
};