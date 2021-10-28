const nodemailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    
    let htmlString = nodemailer.renderTemplate({comment : comment}, '/comment/new_comment.ejs');

    nodemailer.tranporter.sendMail({
        from: 'kunalbansal901@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published!",
        html: htmlString
    }, (err, info) => {
        if(err){ 
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Mail sent', info);
        return;
    });
}