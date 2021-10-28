const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

const tranporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'kunalbansal901@gmail.com',
        pass: 'K_nal1802'
    }
});

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if(err){
                console.log('Error in rendering template', err);
                return;
            } 
            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    tranporter: tranporter,
    renderTemplate: renderTemplate
}