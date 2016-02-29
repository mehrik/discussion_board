myApp.factory('UserFactory', function ($http, $cookies) {
    var factory = {};
    var _UF = this;

    factory.create = function(newUser, callback) {
        $http.post('/user', newUser).success(function (output) {
            // Output should be a UserObj from the database
            // Create a cookie for currentUser
            $cookies.putObject('currentUser', output);
            callback();
        });
    }

    factory.show = function(user_id, callback) {
        $http.get('/user/'+user_id).success(function (output) {
            // Output should be 1 UserObj from the database based on the user_id
            // If no errors, send output back to the UsersController
            if(!output.errors) {
                callback(output);
            } else {
                console.log('You have errors in your UserFactory', output.errors);
            }
        });
    }

    // Inserts newly created topic id into the user's topics array
    factory.update = function(newTopic, callback) {
        // console.log("UF", newTopic);
        $http.patch('/user/'+newTopic._user+'/topic', newTopic).success(function (output) {
            // console.log(output);
            callback();
        })
    }

    factory.clearCurrentUser = function (callback) {
        $cookies.remove('currentUser');
        callback();
    }

    return factory;
});