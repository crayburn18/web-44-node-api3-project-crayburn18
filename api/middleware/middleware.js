const User = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timestamp = new Date().toLocaleString()
  const method = req.method
  const url = req.originalUrl
  console.log('logger middleware')
  next()
}

async function validateUserId(req, res, next) {
  try{
    const user = await User.getById(req.params.id)
    if(!user){
      res.status(404).json({
        messsage:'user not found'
      })
    }else{
      req.user = user
      next()
    }
  }catch(err){
    res.status(500).json({
      messsage:'problem finding user'
    })
  }
}

function validateUser(req, res, next) {
  const { name } = req.body
  if(!name){
    res.status(400).json({
      messsage:'missing required name field'
    })
  }else{
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body
  if(!text){
    res.status(400).json({
      messsage:'missing required text field'
    })
  }else{
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}