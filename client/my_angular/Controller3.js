app.controller('Controller3', ['$scope', '$location', '$routeParams', 'BoardFactory',
  function($scope, $location, $routeParams, BoardFactory){
    $scope.pageClass = 'page-topic';
    console.log($routeParams);
    var topic_id = $routeParams.topic_id;
    console.log(topic_id);
    function currentUser(){
      BoardFactory.currentUser(function(data){
        $scope.current = data;
      });
    }

    currentUser();
    //
  	// $scope.getTopic = function(topic_id, callback){
    //   console.log('looking for the topic');
    //   console.log('the topic id', topic_id);
  	// 	BoardFactory.getTopic(topic_id, function(data){
    //     $scope.topic = data;
    // })
    // }

      function getTopic(topid_id){
      BoardFactory.getTopic(topic_id, function(data){
          $scope.topic = data;
        })
      }

        getTopic(topic_id);

      function getTopicMessagesComments(topic_id){
      console.log(topic_id);
  		BoardFactory.getTopicMessagesComments(topic_id, function(data){
      $scope.messages = data;
      })
  	}

    getTopicMessagesComments(topic_id);
    // $scope.getTopicMessages();

    // $scope.getTopicComments = function(topic_id){
    //   BoardFactory.getTopicComments(topic_id);
    //   $scope.comments = data;
    // }

    // $scope.getTopicComments();

    $scope.addMessage = function(message, topicid){
      message._topic = topicid
      console.log('am i working?');
      console.log(message);
      console.log('the topic', message._topic);
      BoardFactory.addMessage(message, getTopicMessagesComments);
      $scope.newMessage = {};
    }

    // function getMessages(){
    //   BoardFactory.getMessages(function(data){
    //     $scope.messages = data;
    //   })
    // }
    // getMessages();

    $scope.addComment = function(comment, message_id){
      console.log('posting comment');
      comment._message = message_id
      console.log(comment);
      BoardFactory.addComment(comment, message_id, getTopicMessagesComments);
      $scope.newComment = {};
      }
  }
])
