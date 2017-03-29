app.controller('BoardController', ['$scope', '$location', 'BoardFactory', function($scope, $location, BoardFactory){

  // function currentUser(){
  //   BoardFactory.currentUser(function(data){
  //     $scope.user = data;
  //   });
  // }
  // currentUser();

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

  function getMessages(){
    BoardFactory.getMessages(function(data){
      $scope.posts = data;
    })
  }
  getMessages();
  $scope.addMessage = function(message){
    console.log(message);
    BoardFactory.addMessage(message, getMessages);
    $scope.newMessage = {};
  }
  $scope.addComment = function(comment, message_id){
    BoardFactory.addComment(comment, message_id, getMessages);
  }

}])
