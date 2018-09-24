import jwt from 'jsonwebtoken'

function checkAuth(req, res, next) {
  try {
    const token = req.get('Authorization')
    const { user_id } = req.params
    const verifyed = jwt.verify(token, process.env.JWT_SECRET)
    if(Number(user_id) !== Number(verifyed.user_id)) {
      return res.status(401).json({ message: 'Unauthorized request'})
    } else {
      next()
    }
  }
  catch(err) {
    return res.status(401).json({ message: err})
  }
}

export default checkAuth
