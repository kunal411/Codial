const nodemailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    console.log('Inside newComment mailer', comment);

    nodemailer.tranporter.sendMail({
        from: 'kunalbansal901@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published!",
        html: '<h1> Yup, your comment is now published! </h1>'
    }, (err, info) => {
        if(err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Mail sent', info);
        return;
    });
}