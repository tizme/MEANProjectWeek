var app = angular.module('app', ['ngRoute', 'ngMessages']);

app.config(function($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl: 'partials/partial_1.html',
      controller: 'BoardController'
    })
    .when('/register',{
      templateUrl: 'partials/partial_4.html',
      controller: 'LoginController'
    })
    .when('/topics',{
      templateUrl: 'partials/partial_2.html',
      controller: 'BoardController'
    })
    .when('/topic/:id',{
      templateUrl: 'partials/partial_3.html',
      controller: 'Controller3'
    })
    .when('/user/:id',{
      templateUrl: 'partials/partial_5.html',
      controller: 'Controller5'
    })
    .when('/chat',{
      templateUrl: 'partials/partial_6.html',
      controller: 'Controller6'
    })
    .otherwise({
      redirectTo: '/'
    })
})
