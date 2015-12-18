myApp.factory('CategoryFactory', function ($http) {
    var factory = {};
    var _CF = this;
    var categories;

    factory.index = function (callback) {
        // output should be array of category names
        // send back categories to controller
        $http.get('/category').success(function (output) {
            _CF.categories = output;
            callback(_CF.categories);
        });
    }

    return factory;
}) 