const Users = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log({method: `${req.method}`, url: `${req.baseUrl}${req.url}`, time:`${new Date()}`})
  next()
}

async function validateUserId(req, res, next) {
  let id = req.params.id;
  let user = await Users.getById(id)
  if(user == null){
    res.status(404).json({ message: "user not found"})
    return;
  }
  req.user = user;
  next()
}

function validateUser(req, res, next) {
  if(typeof req.body.name !== 'string' || req.body.name.trim() === ""){
    res.status(400).json({ message: 'missing required name field'})
    return;
  }

  req.newUser = { name: req.body.name.trim()}
  next()
}

function validatePost(req, res, next) {x
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}