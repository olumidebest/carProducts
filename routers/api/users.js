const router=require('express').Router()

const {check,validationResult}=require('express-validator')
const User=require('../../models/User')

const bcrypt=require('bcryptjs')

//@route post api/users
//@desc Register user
//@access Public
router.post('/',

[
    check('name','Name is require')
    .not()
    .isEmpty(),

    check('username','please include username')
     .not()
     .isEmpty(),

    check('password',
    'please enter a password with 6 or more characters'
    ).isLength({min:6})
],

(req,res)=>{
  const errors=validationResult(req);
        if(!errors.isEmpty()){
          return res.status(400).json({
            errors:errors.array()
          });
  }
  const{name,username,password}=req.body;
  User.findOne({ username })
  .then(user => {
      if (user) {
           return res.status(400).json({errors:[{msg:'username already exists'}]}) 
      };

      
     

      bcrypt.hash(password, 11, (err, hash) => {
          if (err) {
              return  res.status(400).send('server Error vitore');
          }

          let user = new User({
              name,
              username,
              password: hash,
             
          })
      

          user.save()
              .then(user => {
                  res.status(201).json({
                      message: 'User Created Successfully',
                      // return user object without password

                      user: {
                          id: user._id,
                            name: user.name,
                            username: user.username,
                      }

                  })
              })
              .catch(err=>{
                console.log(err.massage);
                 res.status(400).send('server Error ');
             })
      })
  })
  .catch(err=>{
            console.log(err.massage);
             res.status(400).send('server Error ');
         })
}

);




     

module.exports=router

