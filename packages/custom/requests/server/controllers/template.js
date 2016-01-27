'use strict';

var config = require('meanio').loadConfig();

var header = '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">'+
'<html lang="en">'+
'<head>'+
'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">'+
'<meta name="viewport" content="width=device-width, initial-scale=1"> <!-- So that mobile will display zoomed in -->'+
'<meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- enable media queries for windows phone 8 -->'+
'<meta name="format-detection" content="telephone=no"> <!-- disable auto telephone linking in iOS -->'+
'<title>Single Column</title>'+
''+
'<style type="text/css">'+
'body {'+
'margin: 0;'+
'padding: 0;'+
'-ms-text-size-adjust: 100%;'+
'-webkit-text-size-adjust: 100%;'+
'}'+
'table {'+
'border-spacing: 0;'+
'}'+
'table td {'+
'border-collapse: collapse;'+
'}'+
'.ExternalClass {'+
'width: 100%;'+
'}'+
'.ExternalClass,'+
'.ExternalClass p,'+
'.ExternalClass span,'+
'.ExternalClass font,'+
'.ExternalClass td,'+
'.ExternalClass div {'+
'line-height: 100%;'+
'}'+
'.ReadMsgBody {'+
'width: 100%;'+
'background-color: #ebebeb;'+
'}'+
'table {'+
'mso-table-lspace: 0pt;'+
'mso-table-rspace: 0pt;'+
'}'+
'img {'+
'-ms-interpolation-mode: bicubic;'+
'}'+
'.yshortcuts a {'+
'border-bottom: none !important;'+
'}'+
'@media screen and (max-width: 599px) {'+
'.force-row,'+
'.container {'+
'width: 100% !important;'+
'max-width: 100% !important;'+
'}'+
'}'+
'@media screen and (max-width: 400px) {'+
'.container-padding {'+
'padding-left: 12px !important;'+
'padding-right: 12px !important;'+
'}'+
'}'+
'.ios-footer a {'+
'color: #aaaaaa !important;'+
'text-decoration: underline;'+
'}'+
'</style>'+
'</head>'+
''+
'<body style="margin:0; padding:0;" bgcolor="#F0F0F0" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">'+
''+
'<!-- 100% background wrapper (grey background) -->'+
'<table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" bgcolor="#F0F0F0">'+
'<tr>'+
'<td align="center" valign="top" bgcolor="#F0F0F0" style="background-color: #F0F0F0;">'+
''+
'<br>'+
''+
'<!-- 600px container (white background) -->'+
'<table border="0" width="600" cellpadding="0" cellspacing="0" class="container" style="width:600px;max-width:600px">'+
'<tr>'+
'<td class="container-padding header" align="left" style="font-family:Helvetica, Arial, sans-serif;font-size:24px;font-weight:bold;padding-bottom:12px;color:#337ab7;padding-left:24px;padding-right:24px">'+
'Code Deployment Procedure'+
'</td>'+
'</tr>'+
'<tr>'+
'<td class="container-padding content" align="left" style="padding-left:24px;padding-right:24px;padding-top:12px;padding-bottom:12px;background-color:#ffffff">'+
'<br>'+
''+
''+
'<div class="body-text" style="font-family:Consolas,monaco,monospace;font-size:14px;line-height:20px;text-align:left;color:#333333">';

var footer ='<br><br>'+
'</div>'+
''+
'</td>'+
'</tr>'+
'<tr>'+
'<td class="container-padding footer-text" align="left" style="font-family:Helvetica, Arial, sans-serif;font-size:12px;line-height:16px;color:#aaaaaa;padding-left:24px;padding-right:24px">'+
'<br><br>'+
'You are receiving this email because you opted in on CDP tool '+
'<br><br>'+
''+
'<strong>CDP</strong><br>'+
'<span class="ios-footer">'+
'SMIT GPS<br>'+
'</span>'+
'<a href="http://www.cdp.intel.com" style="color:#aaaaaa">www.cdp.intel.com</a><br>'+
''+
'<br><br>'+
''+
'</td>'+
'</tr>'+
'</table>'+
'<!--/600px container -->'+
''+
''+
'</td>'+
'</tr>'+
'</table>'+
'<!--/100% background wrapper-->'+
''+
'</body>'+
'</html>';

module.exports = {

    approval_email : function(user, reqId, id, plan, type, mailOptions) {
      mailOptions.html = [
          header +
          '<b> Hi ' + user + '</b></br></br>',
          'CDP team  have received a request which requires your approval.',
          'Please click on the link below or paste this into your browser to complete the process:',
          config.hostname + '/requests/' + reqId + '/step/' + id + '/type/' + type +
          footer
      ].join('\n\n');
      mailOptions.subject = 'Approval require for plan ' + plan;
      return mailOptions;
    },

    notification_email : function(user, reqId, id, plan, mailOptions) {
        mailOptions.html = [
            header
            +
            '<b> Hi ' + user + '</b></br></br>',
            'Your request Has been approved'
            +
            footer
        ].join('\n\n');
        mailOptions.subject = 'Approval request for plan '+ plan+ ' has been approved';
        return mailOptions;
    },
    upload_email : function(user, reqId, id, plan, mailOptions) {
        mailOptions.html = [
            header
            +
            '<b> Hi ' + user + '</b></br></br>',
            'Your document has been uploaded successfully, please proceed with next steps'
            +
            footer
        ].join('\n\n');
        mailOptions.subject = 'Doc Upload request for plan '+ plan+ ' has been finished';
        return mailOptions;
    },
    query_email : function(user, reqId, id, plan, query, mailOptions) {
        mailOptions.html = [
            header
            +
            '<b> Hi ' + user + '</b></br></br>',
            'Your query has been uploaded for plan: '+plan+'</br>',
            'Uploaded query : <br>'
             + query
             +
             footer
        ].join('\n\n');
        mailOptions.subject = 'Query upload request for plan '+ plan+ ' has been finished';
        return mailOptions;
    }
};
