app.controller('Controller5', ['$scope', '$location', '$routeParams', 'clientSideFactory',
  function($scope, $location, $routeParams, clientSideFactory){

    function sessionUser(){
      clientSideFactory.sessionUser(function(data){
        $scope.user = data;
      });
    }

    sessionUser();

  	$scope.getUserTopics = function(user_id){
  		clientSideFactory.getUserTopics(user_id);
      $scope.topics = data
  	}

    getUserTopics();

    $scope.getUserMessages = function(user_id){
  		clientSideFactory.getUserMesssages(user_id);
      $scope.messages = data
  	}

    getUserMessages();

    $scope.getUserComments = function(user_id){
      clientSideFactory.getUserComments(user_id);
      $scope.messages = data
    }

    getUserComments();

  }
])
