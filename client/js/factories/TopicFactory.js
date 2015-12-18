myApp.factory('TopicFactory', function ($http) {
    var factory = {}
    var _TF = this;
    var topics = [];

    // Returns list of topics from backend with populated _user and _category
    factory.index = function (callback) {
        $http.get('/topic').success(function (output) {
            // output should be an array of topics with _user populated
            if(!output.errors) {
                _TF.topics = output;
                callback(_TF.topics);
            } else {
                console.log('You have errors in TopicFactory', output.errors);
            }
        });
    }

    // Send newTopic information to backend to create a new topic object
    factory.create = function (newTopic, callback) {
        $http.post('/topic', newTopic).success(function (output) {
            // console.log(output);
            // output should be the newly created topic
            if(!output.errors) {
                callback(output);
            } else {
                console.log('You have errors in TopicFactory', output.errors);
            }
        });
    }

    factory.show = function (topic_id, callback) {
        $http.get('/topic/'+topic_id).success(function (output) {
            // Output should be 1 topicObj from the database based on the topic_id
            // If no errors, send output back to the TopicsController
            if(!output.errors) {
                callback(output);
            } else {
                console.log('You have errors in your TopicFactory', output.errors);
            }
        });
    }

    return factory;
});