/**
 * Created by pjpandey on 12/30/2015.
 */
var config = require('meanio').loadConfig(),
    mongoose = require('mongoose'),
    nodemailer = require('nodemailer'),
    async = require('async'),
    ApprovalDB = mongoose.model('Approval'),
    templates = require('./../../template');


module.exports =  function () {

    function getData(id , cb){
        ApprovalDB.findOne({_id : id}, function(err, approval) {
            if (err) {
                return cb(err);
            }
            return cb(null, approval);
        });
    }

    function processStep(id, reqId, cb) {
        getData(id, function(err , approval){
            var state = approval.state;
            switch (state) {
                case 'ApprovalAskMailSend':
                    processApprovalAskMailSend(approval, reqId, function(response){
                        return  cb(null, response);
                    });
                    break;
                case 'WaitingForApproval':
                    processWaitingForApprovalAndNotify(approval, reqId, function(response){
                        return cb(null, response);
                    });
                    break;
            }
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

    function processApprovalAskMailSend(approval, reqId, cb) {
        async.waterfall([
                function(done) {
                    if (!approval) {
                        return done(true);
                    }
                    else if (approval.status !== 'DEFINED') {
                        return done(true);
                    }
                    return done(null);
                },
                function(done) {
                    var mailOptions = {
                        to: 'priytam.j.pandey@intel.com',
                        from: 'CDP'
                    };
                    mailOptions = templates.approval_email('pjpandey', reqId, approval._id, approval.plan,  mailOptions);
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
                approval.status = 'INPROGRESS';
                approval.state = 'WaitingForApproval';
                approval.currentStateNumber = 2;
                approval.save(function(err) {
                    if (err) {
                        response.message = 'Approval step fail' + err;
                        response.status = 'danger';
                    }
                    return cb(response);
                });
         });
    }

    function processWaitingForApprovalAndNotify(approval, reqId, cb) {
        async.waterfall([
                function(done) {
                    if (!approval) {
                        return done(true);
                    }
                    else if (approval.status !== 'INPROGRESS') {
                        return done(true);
                    }
                    return done(null);
                },
                function(done) {
                    approval.status = 'FINISHED';
                    approval.state = 'ApprovedAndNotified';
                    approval.currentStateNumber = 3;
                    approval.save(function(err) {
                        if (err) {
                            return done(true);
                        }
                        return done(null);
                    });
                }
            ],
            function(err) {
                var response = {
                    message: 'Notification Mail successfully sent',
                    status: 'success'
                };
                if (err) {
                    response.message = 'Approval step fail' + err;
                    response.status = 'danger';
                }
                var mailOptions = {
                    to: 'priytam.j.pandey@intel.com',
                    from: 'CDP'
                };
                mailOptions = templates.notification_email('pjpandey', reqId, approval._id, approval.plan,  mailOptions);
                sendMail(mailOptions, function(err){
                    if (err) {
                        response.message = 'Approval step fail' + err;
                        response.status = 'danger';
                    }
                    return cb(response);
                });
            });
    }

    function update(id, step, cb) {
        getData(id, function(err, result){
            if(err){
                return cb(err);
            }
            var approval = result;
            approval = _.extend(approval,step);
            approval.save(function(err) {
                if (err) {
                    return cb(err);
                }
                cb(null, approval);
            });
        });
    }

    function insert(reqData, name, done) {
        var values = [];
        values[0] = reqData.value;
        var data = {
            values: values,
            name : name,
            plan : reqData.name,
            'executionNumber': reqData.executionNumber,
            'isFirst': reqData.isFirst,
            'isLast': reqData.isLast
        };
        var approval = new ApprovalDB(data);
        approval.user = '';
        approval.save(function (err) {
            if (err) {
                done(err, null);
            }
            done(null, approval);
        })
    }

    return {
        processData :  processStep,
        getData : getData,
        update : update,
        insert : insert
    }
};