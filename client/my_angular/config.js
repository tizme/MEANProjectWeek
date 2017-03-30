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
      controller: 'TopicPageController'
    })
    .when('/user/:user_id',{
      templateUrl: 'partials/user.html',
      controller: 'UserPageController'
    })
    .when('/liveChat',{
      templateUrl: 'partials/liveChat.html',
      controller: 'liveChatController'
    })
    .otherwise({
      redirectTo: '/'
    })
})
