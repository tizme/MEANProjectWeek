app.controller('LoginController', ['$scope', '$location', 'BoardFactory', function($scope, $location, BoardFactory){
$scope.register =function(user){
  console.log('login controller line3', user);
  BoardFactory.register(user);
}
$scope.login=function(user){
  BoardFactory.login(user);
}
}])
