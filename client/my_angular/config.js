var app = angular.module('app', ['ngRoute', 'ngMessages']);

app.config(function($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl: 'partials/parial_1.html',
      controller: 'BoardController'
    })
    .when('/register',{
      templateUrl: 'partials/register.html',
      controller: 'LoginController'
    })
    .when('/category',{
      templateUrl: 'partials/category.html',
      controller: 'BoardController'
    })
    .when('/topic',{
      templateUrl: 'partials/topic.html',
      controller: 'LoginController'
    })
    .when('/user',{
      templateUrl: 'partials/user.html',
      controller: 'LoginController'
    })
    .otherwise({
      redirectTo: '/'
    })
})
