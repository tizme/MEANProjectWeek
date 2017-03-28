app.controller('Controller2', ['$scope', '$location', 'BoardFactory',
  function($scope, $location,  BoardFactory){

    function currentUser(){
      BoardFactory.currentUser(function(data){
        $scope.user = data;
      });
    }

    currentUser();

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
      $scope.messages = data
    }

    getUserComments();

  }
])
