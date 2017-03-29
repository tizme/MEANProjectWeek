app.controller('Controller5', ['$scope', '$location', '$routeParams', 'BoardFactory',
  function($scope, $location, $routeParams, BoardFactory){
    console.log($routeParams.id);
  var user_id = $routeParams.id
  console.log(user_id);
    // function curretnUser(){
    //   BoardFactory.currentUser(function(data){
    //     $scope.user = data;
    //   });
    // }
    //
    // currentUser();

  	$scope.getUserTopics = function(){
      console.log('userid', user_id);
  		BoardFactory.getUserTopics(user_id);
      $scope.topics = data
  	}

    $scope.getUserTopics();

    $scope.getUserMessages = function(user_id){
  		BoardFactory.getUserMesssages(user_id);
      $scope.messages = data
  	}

    $scope.getUserMessages();

    $scope.getUserComments = function(user_id){
      BoardFactory.getUserComments(user_id);
      $scope.comments = data
    }

    $scope.getUserComments();

  }
])
