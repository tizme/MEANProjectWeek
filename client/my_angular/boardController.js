app.controller('BoardController', ['$scope', '$location', 'BoardFactory', function($scope, $location, BoardFactory){

  $scope.pageClass = 'page-board';

  function currentUser(){
    BoardFactory.currentUser(function(data){
      $scope.user = data;
    });
  }
  currentUser();

  function getTopics(){
    BoardFactory.getTopics(function(data){
      $scope.topics = data;
    })
  }
  getTopics();
  $scope.submitTopic = function(topic){
    console.log(topic);
    BoardFactory.submitTopic(topic, getTopics);
    $scope.newTopic = {};
  }
  getTopics();

  function getMessages(){
    BoardFactory.getMessages(function(data){
      $scope.messages = data;
    })
  }
  getMessages();

  $scope.addMessage = function(message){
    console.log('am i working?');
    console.log(message);
    BoardFactory.addMessage(message, getMessages);
    $scope.newMessage = {};
  }
  $scope.addComment = function(comment, message_id){
    BoardFactory.addComment(comment, message_id, getMessages);
    $scope.newComment = {};
  }

}])
