import jwt from 'jsonwebtoken'

function getUserId(req,res,next) {
  try {
    const token = req.get('Authorization')
    const decoded = jwt.decode(token)
    console.log('Middleware UID: ', decoded)
    req.user_id = decoded.user_id
    next()
  }
  catch(err) {
    return res.status(401).json({message: err})
  }
}

export default getUserId
