'use strict';

module.exports = {
    approval_email : function(user, reqId, id, plan, mailOptions) {
      mailOptions.html = [
          '<img src="/system/assets/img/loaders/gear.gif" class="ajax-loader"/></br></br>',

          '<b> Hi ' + user + '</b></br><</br>',
          'CDP team  have received a request which requires your approval.',
          'Please click on the link below or paste this into your browser to complete the process:',
          'http://' + 'localhost:3000' + '/requests/' + reqId + '/step/' + id,
          ''
      ].join('\n\n');
      mailOptions.subject = 'Approval require for plan ' + plan;
      return mailOptions;
    },

    notification_email : function(user, reqId, id, plan, mailOptions) {
        mailOptions.html = [
            '<img src="/system/assets/img/loaders/gear.gif" class="ajax-loader"/></br></br>',

            '<b> Hi ' + user + '</b></br><</br>',
            'Your request Has been approved'
        ].join('\n\n');
        mailOptions.subject = 'Approval request for plan '+ plan+ ' has been approved';
        return mailOptions;
    },
    upload_email : function(user, reqId, id, plan, mailOptions) {
        mailOptions.html = [
            '<img src="/system/assets/img/loaders/gear.gif" class="ajax-loader"/></br></br>',

            '<b> Hi ' + user + '</b></br><</br>',
            'Your document has been approved'
        ].join('\n\n');
        mailOptions.subject = 'Doc Upload request for plan '+ plan+ ' has been finished';
        return mailOptions;
    }
};
