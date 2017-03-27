app.controller('LoginController', ['$scope', '$location', 'QAFactory', function($scope, $location, QAFactory){
$scope.register =function(user){
  console.log('login controller line3', user);
  QAFactory.register(user);
}
$scope.login=function(user){
  QAFactory.login(user);
}
}])
