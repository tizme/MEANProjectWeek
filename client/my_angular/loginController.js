app.controller('LoginController', ['$scope', '$location', 'BoardFactory', function($scope, $location, BoardFactory){
$scope.register =function(user){
  console.log('login controller line3', user);
  BoardFactory.register(user);
}
$scope.login=function(user){
  BoardFactory.login(user);
}
$scope.loggedin = false
  function currentUser(){
    BoardFactory.currentUser(function(data){
      $scope.user = data;
      if (data){
        $scope.loggedin = true;
      }
    });
  }
  currentUser();

}])
