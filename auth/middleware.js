const jwt = require('jsonwebtoken');
require('dotenv').config();

function allowAccess(req, res, next){
  console.log(req.params.id);
  console.log(req);

  if(req.user.id == req.params.id){
    next();
  }else{
    res.status(401)
    next(new Error('Un-Authorized'))
  }
}

module.exports = {
  allowAccess
}
