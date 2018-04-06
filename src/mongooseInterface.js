const Users = require('./mongooseModel');




exports.signup = function(req, res) {
  const user = Users(req.body);
  user.save(function(err, user) {
      if (err) {
          res.send(err);
      }
      console.log(user);
      res.json(user);
  })
};

exports.findOne = function(obj) {
    return Users.findOne(obj);
};


