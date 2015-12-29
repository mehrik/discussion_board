myApp.controller('UsersController', function ($location, $routeParams, UserFactory) {
    var _this = this;

    this.create = function() {
        // _this.newUser is pulled from login.html
        // _this.newUser contains 1 name
        UserFactory.create(_this.newUser, function (newUser) {
            // Retrieve newUser from UserFactory.create
            // Redirect to dashboard.html
            // Currently have newUser information -- not doing anything with it yet
            $location.path('/dashboard');
        });
    }

    this.logout = function () {
        UserFactory.clearCurrentUser(function () {});
        $location.path('/');
    }

    if($routeParams.userId) {
        var user_id = $routeParams.userId;
        console.log('doing the users stuff!');
        // Retrieve user information 
        // Set retrieved user information to _this.displayUser
        UserFactory.show(user_id, function (retrievedUser) {
            _this.displayUser = retrievedUser;
            console.log(_this.displayUser);
        });
    }
    
});