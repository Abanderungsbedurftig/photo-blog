const nodemailer = require('nodemailer');
const config = require('../config');

module.exports = function(){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: config.get('gmail:user'),
               pass: config.get('gmail:password')
           }
    });
    const from = `Photo Blog <${config.get('gmail:user')}>`;
    const errorRecipient = `Photo Blog <${config.get('gmail:user')}>`;

    return {
        send: function(to, subj, body){
            transporter.sendMail({
                from: from,
                to: to,
                subject: subj,
                html: body,
                generateTextFromHtml: true
            }, function(err){
                if(err) console.log('Nodemailer error: ', err);
            });
        },

        emailError: function(message, filename, exception){
            let body = '<h3>Photo blog error.</h3>' + '<br><pre>' + message + '</pre><br>';
            if(exception) body += 'exception:<br><pre>' + exception + '</pre><br>';
            if(filename) body += 'filename:<br><pre>' + filename + '</pre><br>';
            transporter.sendMail({
                from: from,
                to: errorRecipient,
                subject: 'Photo Blog error',
                html: body,
                generateTextFromHtml: true
            }, function(err){
                if(err) console.log('Nodemailer error: ', err);
            });
        }
    }
}