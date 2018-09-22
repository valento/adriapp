import jwt from 'jsonwebtoken'

function checkAuth(req, res, next) {
  try {
    const token = req.get('Authorization')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    next()
  }
  catch(err) {
    return res.status(401).json({ message: err})
  }
}

export default checkAuth
