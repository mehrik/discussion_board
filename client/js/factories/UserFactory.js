myApp.factory('UserFactory', function ($http) {
    var factory = {};
    var _UF = this;

    factory.create = function(newUser, callback) {
        $http.post('/user', newUser).success(function (output) {
            // Output should be a UserObj from the database
            // Set logged in user (current_user) to the output
            // Send current_user back to UsersController
            _UF.current_user = output;
            callback(_UF.current_user);
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
            console.log(output);
            callback();
        })
    }

    factory.getCurrentUser = function(callback) {
        callback(_UF.current_user);
    }

    factory.clearCurrentUser = function (callback) {
        _UF.current_user = null;
        callback();
    }

    return factory;
});