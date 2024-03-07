const express = require('express')
const router = new express.Router()
const Product = require('../models/userSchemavalue')
const { connection } = require('mongoose')
const bcrypt = require('bcryptjs');
const authenticate = require('../midlleware/authenticate')

router.post('/register', async (req, resp) => {
   const { fname, email, password, cpassword } = req.body
   if (!fname || !email || !password || !cpassword) {
      resp.status(422).json({ msg: "Fill all the coloumn" })
   }
   try {
      const preuser = await Product.findOne({ email: email })
      if (preuser) {
         resp.status(422).json({ msg: "This email already exsits" })
      } else if (password !== cpassword) {
         resp.status(422).json({ msg: "Password and Confirm Password not match" })
      } else {
         // const finaluser = new Product(req.body);
         // const result = await finaluser.save();       --> first method
         const finaluser = new Product({ fname, email, password, cpassword });
         // fname : fanme  -- > first one is database ki table name and second is hum kya bhej rhe hai

         // final value save karne se pahle encrypt karenge password with the help of hashng example --> 123456 --> e@klsa4 
         // here password hashing  --> userShemasvalue ke andur kar rhe h

         const storedata = await finaluser.save();
         resp.status(201).json({ status: 201, storedata })

      }
   }
   catch (e) {
      resp.status(422).json(e)
      console.log("Catch block")

   }
})

//user login
router.post('/login', async (req, resp) => {
   const { email, password } = req.body
   if (!email || !password) {
      resp.status(422).json({ msg: "Fill all the coloumn" })
   }
   try {
      const uservalid = await Product.findOne({ email: email }) // ---> simple email bhi likh sktey hai
      if (uservalid) {
         const isMatch = await bcrypt.compare(password, uservalid.password)//---->db wal password user wala password compare hoga
         if (!isMatch) {
            resp.status(422).json({ msg: "Invalid Details" })
         } else {
            //token generate
            const token = await uservalid.generateAuthtoken();
            console.log(token)

            //cokkie generate
            resp.cookie("usercookie", token, {
               expires: new Date(Date.now() + 9000000),
               httpOnly: true
            });
            const result = {
               uservalid,
               token
            }
            resp.status(201).json({ status: 201, result })
         }

      }
   }
   catch (e) {
      console.error(e);
      resp.status(422).json({ error: "An error occurred" });
   }

   // console.log(req.body)
   // resp.send(req.body)

})

router.get('/validuser', authenticate, async (req, resp) => {

   try {
      const validuserOne = await Product.findOne({ _id: req.userId })
      resp.status(201).json({ status: 201, validuserOne })
   }
   catch (error) {
      resp.status(401).json({ status: 401, error })

   }
})


router.get("/logout",authenticate,async(req,res)=>{
   try {
       req.rootuser.tokens =  req.rootuser.tokens.filter((curelem)=>{
           return curelem.token !== req.token
       });

       res.clearCookie("usercookie",{path:"/"});

       req.rootuser.save();

       res.status(201).json({status:201})

   } catch (error) {
       res.status(401).json({status:401,error})
   }
})



module.exports = router;

// encypt 2 way connection

// hashing means -->  compare password
// 1 way connection
// 1234 --> (asda)
// 1234 --> (asda,asda)=>true