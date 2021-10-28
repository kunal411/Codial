const queue = require('../config/kue');

const commentsMailer = require('../mailers/comments_mailer');

queue.process('Emails', function(job, done){
    console.log('Emails worker is processing job ', job.data);

    commentsMailer.newComment(job.data);
    done();
})