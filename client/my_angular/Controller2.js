app.controller('Controller2', ['$scope', '$location', '$routeParams', 'BoardFactory',
  function($scope, $location, $routeParams, BoardFactory){

    function currentUser(){
      BoardFactory.currentUser(function(data){
        $scope.user = data;
      });
    }

    currentUser();

    getUser = function(user_id){
      console.log('attempting to get user data');
      console.log(user_id);
      BoardFactory.getUser(user_id);
      $scope.user = data;
    }
    getUser($routeParams.id);
    //
  	// getUserTopics = function(user_id, callback){
    //   console.log('attempting to get get topics');
    //   console.log(user_id);
    //   BoardFactory.getUserTopics(user_id);
    //   $scope.topics = data;
  	// }
    //
    // getUserTopics();
    //
    // getUserMessages = function(user_id, callback){
  	// 	BoardFactory.getUserMesssages(user_id);
    //   $scope.messages = data;
  	// }
    //
    // getUserMessages();
    //
    // getUserComments = function(user_id, callback){
    //   BoardFactory.getUserComments(user_id);
    //   $scope.comments = data;
    // }
    //
    // getUserComments();

  }
])
