import express from 'express'
import database from '../api/user'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import checkAuth from '../middleware/check_auth'
import getUserId from '../middleware/get_user_id'

dotenv.config({ silent: true })

const userRouter = express.Router({
  mergeParams: true
})
const db = new database(process.env.DB, 'users')

userRouter.use(bodyParser.json())
userRouter.use(bodyParser.urlencoded({extended: true}))
//userRouter.all('*', checkAuth)
// ---- Get User Data: ------------------------------
userRouter.get('/data/', getUserId, (req, res, next) => {
  var data = ['username','gender','credit','role']
  db.fetchById( req.user_id , data ).then( user => {
    res.status(200).json({
      user: {
        username: user.username,
        credit: user.credit,
        role: Number(user.role),
        gender: (user.gender !== null) ? user.gender : -1
      }
    })
  })
  .catch( error => console.log(error.message))
})

// ---- Save User Data: ------------------------------

userRouter.post('/data/:user_id', checkAuth, (req, res, next) => {
  const { data } = req.body.data

  db.updateUserData(req.params, { data }).then((err,user) => {
    if(err){
      res.status(400).json({
        errors: {
          global: err.msg
        }
      })
    } else {
      res.status(200).json({
        changes: true
      })
    }
  })

})

export default userRouter
