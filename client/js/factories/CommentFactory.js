myApp.factory('CommentFactory', function ($http) {
    var factory = {};
    var _CF = this;

    factory.create = function (post, callback) {
        var post_id = post._id;
        var user_id = post.newComment._user._id;
        // Go to /comment in backend
        // Output should be newly created comment
        $http.post('/comment', post).success(function (output) {
            if (!output.errors) {
                $http.patch('/post/'+post_id+'/comment', output).success(function (postOutput) {
                    console.log(postOutput);
                });
                $http.patch('/user/'+user_id+'/comment', output).success(function (userOutput) {
                    console.log(userOutput);
                });
                callback();
            } else {
                // errors will be printed
                console.log(output);
            }
        });
    }

    return factory;
})