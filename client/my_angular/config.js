var app = angular.module('app', ['ngRoute', 'ngMessages']);

app.config(function($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl: 'partials/dashboard.html',
      controller: 'BoardController'
    })
    .when('/register',{
      templateUrl: 'partials/register.html',
      controller: 'LoginController'
    })
    .when('/topics',{
      templateUrl: 'partials/topiclist.html',
      controller: 'BoardController'
    })
    .when('/topic/:topic_id',{
      templateUrl: 'partials/topic.html',
      controller: 'Controller3'
    })
    .when('/user/:user_id',{
      templateUrl: 'partials/user.html',
      controller: 'Controller5'
    })
    .otherwise({
      redirectTo: '/'
    })
})
