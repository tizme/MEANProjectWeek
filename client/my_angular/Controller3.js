app.controller('Controller3', ['$scope', '$location', '$routeParams', 'clientSideFactory',
  function($scope, $location, $routeParams, clientSideFactory){

    function current(){
      clientSideFactory.current(function(data){
        $scope.current = data;
      });
    }

    sessionUser();

  	$scope.getTopic = function(topic_id){
  		clientSideFactory.getTopic(topic_id);
      $scope.topic = data
  	}

    getTopic();

    $scope.getTopicMessages = function(topic_id){
  		clientSideFactory.getTopicMesssages(topic_id);
      $scope.messages = data
  	}

    getTopicMessages();

    $scope.getTopicComments = function(topic_id){
      clientSideFactory.getTopicComments(topic_id);
      $scope.comments = data
    }

    getTopicComments();

  }
])
