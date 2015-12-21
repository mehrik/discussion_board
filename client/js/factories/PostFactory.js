myApp.factory('PostFactory', function ($http) {
    var factory = {};
    var _PF = this;

     // Returns list of posts from backend
    factory.index = function (callback) {
        $http.get('/post').success(function (output) {
            // output should be an array of posts
            if(!output.errors) {
                _PF.posts = output;
                callback(_PF.posts);
            } else {
                console.log('You have errors in PostFactory', output.errors);
            }
        });
    }

    factory.create = function (newPost, callback) {
        console.log('From the PF', newPost);
        // output should be newly created post
        $http.post('/post', newPost).success(function (newPostOutput) {
            console.log('$http.post', newPostOutput);
            // Update Topic
            // Update User who posted
            $http.patch('/user/'+newPostOutput._user+'/post', newPostOutput).success(function (userOutput) {
                console.log("$http.patch USER", userOutput);
            });
            // Update topic 
            $http.patch('/topic/'+newPostOutput._topic, newPostOutput).success(function (postOutput) {
                console.log("$http.patch POST", postOutput);
                // callback called here after topic has been updated
                // Should refresh displayed topic so newly added posts show up
                callback();
            });
        });// end $http.post
    }// end function

    factory.updateLikes = function (post, PostUser, CurrentUser, callback) {
        // If PostUser._id and CurrentUser._id are not the same, send information to backend
        if (PostUser._id !== CurrentUser._id) {
            $http.patch('/post/'+post._id+'/likes').success(function (output) {
                callback();
            });
        } else {
            console.log('Cannot like');
        }
    }

    factory.updateDislikes = function (post, PostUser, CurrentUser, callback) {
        // If PostUser._id and CurrentUser._id are not the same, send information to backend
        if (PostUser._id !== CurrentUser._id) {
            $http.patch('/post/'+post._id+'/dislikes').success(function (output) {
                callback();
            });
        } else {
            console.log('Cannot like');
        }
    }

    return factory;
})