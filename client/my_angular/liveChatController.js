app.controller('Controller5', ['$scope', '$location', 'BoardFactory',
  function($scope, $location, BoardFactory){
    function currentUser(){
      BoardFactory.currentUser(function(data){
        $scope.user = data;
      });
    }
    currentUser();

  }])
