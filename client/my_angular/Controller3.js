app.controller('Controller3', ['$scope', '$location', '$routeParams', 'BoardFactory',
  function($scope, $location, $routeParams, BoardFactory){

    function currentUser(){
      BoardFactory.currentUser(function(data){
        $scope.current = data;
      });
    }

    currentUser();

  	$scope.getTopic = function(topic_id){
  		BoardFactory.getTopic(topic_id);
      $scope.topic = data
  	}

    getTopic();

    $scope.getTopicMessages = function(topic_id){
  		BoardFactory.getTopicMesssages(topic_id);
      $scope.messages = data
  	}

    getTopicMessages();

    $scope.getTopicComments = function(topic_id){
      BoardFactory.getTopicComments(topic_id);
      $scope.comments = data
    }

    getTopicComments();

  }
])
