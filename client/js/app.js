var myApp = angular.module('myApp', ['ngRoute', 'ngMessages']);

myApp.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'views/partials/login.html',
        controller: 'UsersController as UC'
    })
    .when('/dashboard', {
        templateUrl: 'views/partials/dashboard.html',
        controller: 'TopicsController as TC'
    })
    .when('/topic/:topicId', {
        templateUrl: 'views/partials/topic.html',
        controller: 'TopicsController as TC'
    })
    .when('/user/:userId', {
        templateUrl: 'views/partials/user.html',
        controller: 'UsersController as UC'
    })
});