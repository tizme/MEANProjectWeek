app.controller('Controller5', ['$scope', '$location', '$routeParams', 'BoardFactory',
  function($scope, $location, $routeParams, BoardFactory){

    function curretnUser(){
      BoardFactory.currentUser(function(data){
        $scope.user = data;
      });
    }

    sessionUser();

  	$scope.getUserTopics = function(user_id){
  		BoardFactory.getUserTopics(user_id);
      $scope.topics = data
  	}

    getUserTopics();

    $scope.getUserMessages = function(user_id){
  		BoardFactory.getUserMesssages(user_id);
      $scope.messages = data
  	}

    getUserMessages();

    $scope.getUserComments = function(user_id){
      BoardFactory.getUserComments(user_id);
      $scope.comments = data
    }

    getUserComments();

  }
])
