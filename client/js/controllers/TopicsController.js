myApp.controller('TopicsController', function ($routeParams, $location, $cookies, TopicFactory, CategoryFactory, UserFactory, PostFactory, CommentFactory) {
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
        // Sets user information to _this.currentUser
        _this.current_user = $cookies.getObject('currentUser');
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

    this.show = function (topic_id) {
        // Retrieve tpoic information 
        // Set retrieved topic information to _this.displayTopic
        TopicFactory.show(topic_id, function (retrievedTopic) {
            _this.displayTopic = retrievedTopic;
        });
    }

    // If topicID exists in the route, retrieve data for that specific topic
    if($routeParams.topicId) {
        var topic_id = $routeParams.topicId;
        _this.show(topic_id);
    }

    // Retrieve newPost.content
    // Update current post
    this.createPost = function () {
        // setting up newPost._user & _topic for ease of creating a new post object
        // _this.current user is from user being previously logged in
        // _this.displayTopic is from the topic that is being shown
        _this.newPost._user = _this.current_user
        _this.newPost._topic = _this.displayTopic;
        // create new post, if successfully clear out _this.newPost
        PostFactory.create(_this.newPost, function () {
            _this.newPost = {};
            _this.show($routeParams.topicId);
        });
    }

    // updates the like on a post
    // Current user cannot like his/her own post
    this.updateLikes = function (post, CurrentUser) {
        PostFactory.updateLikes(post, post._user, CurrentUser, function () {
            _this.show($routeParams.topicId);
        });
    }

    // updates the dislike on a post
    // Current user cannot dislike his/her own post
    this.updateDislikes = function (post, CurrentUser) {
        PostFactory.updateDislikes(post, post._user, CurrentUser, function () {
            _this.show($routeParams.topicId);
        });
    }

    this.createComment = function (post) {
        // Created object for use in comments.js
        // post parameter is the post where the new comment is created in
        post.newComment._user = _this.current_user;
        CommentFactory.create(post, function () {
            // refresh page so new comments are shown
            // refreshing the page automatically clears out the form
            _this.show($routeParams.topicId);
        });
    }

    this.logout = function () {
        UserFactory.clearCurrentUser(function () {});
        $location.path('/');
    }

    this.index();

    // if no user is signed in, redirect to login page
    if(!_this.current_user) {
        $location.path('/');
    }
});