app.controller('Controller2', ['$scope', '$location', 'BoardFactory',
  function($scope, $location,  BoardFactory){

    // function currentUser(){
    //   BoardFactory.currentUser(function(data){
    //     $scope.user = data;
    //   });
    // }
    //
    // currentUser();

  	$scope.getUserTopics = function(user_id, callback){
      console.log('attempting to get get topics');
      console.log(user_id);
      BoardFactory.getUserTopics(user_id);
      $scope.topics = data;
  	}

    $scope.getUserTopics();

    $scope.getUserMessages = function(user_id, callback){
  		BoardFactory.getUserMesssages(user_id);
      $scope.messages = data;
  	}

    $scope.getUserMessages();

    $scope.getUserComments = function(user_id, callback){
      BoardFactory.getUserComments(user_id);
      $scope.comments = data;
    }

    $scope.getUserComments();

  }
])
