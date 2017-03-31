app.controller('Controller5', ['$scope', '$location', '$routeParams', 'BoardFactory',
  function($scope, $location, $routeParams, BoardFactory){
    $scope.pageClass = 'page-user';
    console.log('route', $routeParams);
  var user_id = $routeParams.user_id;
  console.log('user', user_id);
    // function curretnUser(){
    //   BoardFactory.currentUser(function(data){
    //     $scope.user = data;
    //   });
    // }
    //
    // currentUser();


    getUser = function(user_id){
      console.log('attempting to get user data');
      console.log('route params', $routeParams.user_id);
      console.log(user_id);
      BoardFactory.getUser(user_id, function(data){
        $scope.user = data;
      });
    }
    getUser(user_id);

  	// $scope.getUserTopics = function(){
    //   console.log('userid', user_id);
  	// 	BoardFactory.getUserTopics(user_id);
    //   $scope.topics = data
  	// }
    //
    // $scope.getUserTopics();
    //
    // $scope.getUserMessages = function(user_id){
  	// 	BoardFactory.getUserMesssages(user_id);
    //   $scope.messages = data
  	// }
    //
    // $scope.getUserMessages();
    //
    // $scope.getUserComments = function(user_id){
    //   BoardFactory.getUserComments(user_id);
    //   $scope.comments = data
    // }
    //
    // $scope.getUserComments();

  }
])
