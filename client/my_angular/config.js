var app = angular.module('app', ['ngRoute', 'ngMessages', 'ngAnimate']);

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
    .when('/chat',{
      templateUrl: 'partials/partial_6.html',
      controller: 'Controller6'
    })
    .otherwise({
      redirectTo: '/'
    })
})
