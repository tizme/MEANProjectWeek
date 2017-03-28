getUserMessagesTopicsComments: function(req, res){
  User.findOne({_id: req.params.user_id}).populate('_messages').populate('_topics').populate('_comments').exec(function(err, data){
    if(err){
      res.status(400).send("Problem getting messages.")
    }
    else{
      res.json(data);
    }
  })
},

getUserMessages: function(req, res){
  User.findOne({_id: req.params.user_id}).populate('_messages').exec(function(err, data){
    if(err){
      res.status(400).send("Problem getting user posts.")
    }
    else{
      res.json(data);
    }
  })
},
getUserTopics: function(req, res){
  User.findOne({_id: req.params.user_id}).populate('_topics').exec(function(err, data){
    if(err){
      res.status(400).send("Problem getting user topics.")
    }
    else{
      res.json(data);
    }
  })
},
getUserComments: function(req, res){
  User.findOne({_id: req.params.user_id}).populate('_comments').exec(function(err, data){
    if(err){
      res.status(400).send("Problem getting user posts.")
    }
    else{
      res.json(data);
    }
  })
}
