const express=require('express')
const router=express.Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')
const Post=require('../models/Post')
const Comment=require('../models/Comments')
const verifyToken = require('../verifyToken')


//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
    try {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hashSync(req.body.password, salt);
      }
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//DELETE
router.delete("/:id",verifyToken,async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        await Post.deleteMany({userId:req.params.id})
        await Comment.deleteMany({userId:req.params.id})
        res.status(200).json("User has been deleted!")

    }
    catch(err){
        res.status(500).json(err)
    }
})


//GET USER
router.get("/:id",async (req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        const {password,...info}=user._doc
        res.status(200).json(info)
    }
    catch(err){
        res.status(500).json(err)
    }
})


module.exports=router


// const express = require('express')
// const router = express.Router()
// const User = require('../models/User')
// const bcrypt = require('bcrypt')
// const Post = require('../models/Post')
// const Comment = require('../models/Comments')
// const verifyToken = require('../verifyToken')


// //update
// router.put("/:id", verifyToken, async (req, res) => {
//     try {
//         if (req.body.password) {
//             const salt = await bcrypt.genSalt(10);
//             req.body.password = await bcrypt.hashSync(req.body.password, salt);
//         }
//         const updatedUser = await User.findByIDAndUpdate(req.params.id,
//             { $set: req.body },
//             { new: true }
//         );
//         res.status(200).json(updatedUser)
//     }
//     catch (err) {
//         res.status(500).json(err)
//     }
// })

// //delete

// router.delete("/:id", verifyToken, async (req, res) => {
//     try {
//         await User.findByIDAndDelete(req.params.id)
//         await Post.deletMany({ userId: req.params.id })
//         await Comment.deletMany({ userId: req.params.id })
//         res.status(200).json("user deleted successfully")
//     }
//     catch (err) {
//         res.status(500).json(err)
//     }
// })

// //get user
// router.get("/:id", async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id)
//         const { password, ...info } = user._doc
//         res.status(200).json(info)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

// module.exports = router