const Users = require('./mongooseModel');




exports.signup = function(req, res) {
  const user = Users(req.body);
  user.save(function(err, user) {
      if (err) {
          res.send(err);
      }
      console.log(user);
      res.send({msg: 'User Created'});
  })
};

exports.findOne = function(obj) {
    return Users.findOne(obj);
};


