///$http commands will need to be adjusted based on serverside routes

app.factory('BoardFactory', ['$location', '$http', function($location, $http){
  var factory = {};
  factory.register = function(user){
    console.log("got to boardFactory line 6");
    $http({
      url: '/register',
      method: 'POST',
      data: user
    }).then(function(res){
      console.log("sucess!");
      console.log(res);
      $location.url('/')
    }, function(res){
      console.log('line 14', res);
    })

  };

  factory.login = function(user){
    $http({
      url: '/login',
      method: 'POST',
      data: user
    }).then(function(res){
      console.log("login sucess boardfactory line 25!");
      console.log(res);
      $location.url('/topics');
    }, function(res){
      console.log('boardfactory line 29', res);
    })

  };
// not sure how to use current user if we are allowing access to site without registration.
  // factory.currentUser = function(callback){
  //   $http({
  //     url: '/current',
  //     method: 'GET'
  //   }).then(function(res){
  //     callback(res.data);
  //   },function(res){
  //     $location.url('/')
  //     console.log(res);
  //   })
  // },

  factory.submitTopic = function(topic, callback){
    console.log('factory reached');
    $http({
      url: '/topic',
      method: 'POST',
      data: topic
    }).then(function(res){
      console.log(res);
      callback()
    },function(res){
      console.log(res);
    })
  },

    factory.getTopics = function(callback){
      $http({
        url: '/topics',
        method: 'GET'
      }).then(function(res){
        callback(res.data);
      },function(res){
        console.log(res);
      })
    },

  factory.addMessage = function(message, callback){
    $http({
      url: '/message',
      method: 'POST',
      data: message
    }).then(function(res){
      console.log(res);
      callback()
    },function(res){
      console.log(res);
    })
  },

  factory.getMessages = function(callback){
    $http({
      url: '/messages',
      method: 'GET'
    }).then(function(res){
      callback(res.data);
    },function(res){
      console.log(res);
    })
  },

  factory.addComment = function(comment, message_id, callback ){
    $http({
      url: '/comment/' + message_id,
      method: 'POST',
      data: comment
    }).then(function(res){
      callback();
      console.log(res);
    },function(res){
      console.log(res);
    })
  },

  factory.getUser = function (user_id, callback){
    console.log('getting to server?', user_id);
    $http({
      url: '/user/' + user_id,
      method: 'GET'
    }).then(function(res){
      callback(res.data);
      console.log(res);
    })
  },

  factory.getUserTopics = function (user_id, callback){
    console.log('getting to server?', user_id);
  $http({
    url: '/user_topics/' + user_id,
    method: 'GET'
  }).then(function(res){
    callback(res.data);
    console.log(res);
  },function(res){
    console.log(res);
  })
},

    factory.getUserMessages = function (user_id, callback){
    $http({
      url: '/user_messages/' + user_id,
      method: 'GET'
    }).then(function(res){
      callback(res.data);
      console.log(res);
    },function(res){
      console.log(res);
    })
  },

    factory.getUserComments = function (user_id, callback){
    $http({
      url: '/user_comments/' + user_id,
      method: 'GET'
    }).then(function(res){
      callback(res.data);
      console.log(res);
    },function(res){
      console.log(res);
    })
  }
  return factory;
}])
