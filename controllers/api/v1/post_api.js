const Post = require('../../../models/post')
const Comment = require('../../../models/comment');
const { json } = require('express');

module.exports.index  = async function(req, res){

    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
    });

    var jsonObject = {
        message: "List of Posts",
        posts: posts
    }
    jsonObject.posts.forEach(function(key){
        key.user.password = '********';
        key.comments.forEach(function(com){
            com.user.password = '********'
        })
    });
    return res.json(200, jsonObject);
    
}


module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        //if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});


            // if (req.xhr){
            //     return res.status(200).json({
            //         data: {
            //             post_id: req.params.id
            //         },
            //         message: "Post deleted"
            //     });
            // }
            return res.json(200,{
                message: "Post and associated comments deleted!"
            })

            //req.flash('success', 'Post and associated comments deleted!');

            return res.redirect('back');
        //}
        // else{
        //     req.flash('error', 'You cannot delete this post!');
        //     return res.redirect('back');
        // }

    }catch(err){
        console.log('*****', err);
        //req.flash('error', err);
        return res.json(500,{
            message: "Internal Server Error"
        })
    }
    
}