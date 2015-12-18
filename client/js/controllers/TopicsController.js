myApp.controller('TopicsController', function($routeParams, TopicFactory, CategoryFactory, UserFactory) {
    var _this = this;

    this.index = function () {
        // should come back as a list of all topics
        // Sets list of all topics to local _this.topics for use in the partial
        TopicFactory.index(function (topicsIndex) {
            _this.topics = topicsIndex;
        });
        // should come back as a list of category objects w/ name key
        // Sets category object to local _this.categories for use in the partial
        CategoryFactory.index(function (categoriesIndex) {
            _this.categories = categoriesIndex;
        });
        // Retrieve logged in user information from UserFactory
        // Sets user information to _this.currentUser
        UserFactory.getCurrentUser(function (UF_currentUser) {
            _this.current_user = UF_currentUser;
        });
    }

    this.create = function () {
        // set newTopic._user to logged in user Obj
        _this.newTopic._user = _this.current_user;
        TopicFactory.create(_this.newTopic, function (TF_newTopic) {
            // this function will happen only if there are no errors from the 
            // TopicFactory.create method
            // Update User's topic's array
            UserFactory.update(TF_newTopic, function () {
                // reset _this.newTopic to empty
                // call index and reset the topics table in dashboard.html
                _this.newTopic = {};
                _this.index();
            })
        });
    }

    if($routeParams.topicId) {
        var topic_id = $routeParams.topicId;
        // Retrieve tpoic information 
        // Set retrieved topic information to _this.displayTopic
        TopicFactory.show(topic_id, function (retrievedTopic) {
            _this.displayTopic = retrievedTopic;
            console.log(_this.displayTopic);
        });
    }

    this.index();
});