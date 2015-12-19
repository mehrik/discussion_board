myApp.factory('PostFactory', function ($http) {
    var factory = {};
    var _PF = this;

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

    return factory;
})