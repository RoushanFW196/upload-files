
const express=require('express');
const path=require('path');
const router=express.Router();
const fs=require('fs');
const upload=require('../utils/file-upload.js');

const User=require('../models/user.models.js');


router.post("/single" ,upload.single("profile_pic"),async (req,res)=>{
      
    const create_profile=await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
         profile_pic: req.file.path
    })

res.status(201).json({data:create_profile})

});




  router.patch("/:id",upload.single("profile_pic"), async(req, res)=>{
     
    const user = await User.findById(req.params.id)
console.log(req.body)
 console.log(req.file)
  try{  
    if(req.file!=undefined){
        fs.unlink(user.profile_pic, function (err) {
            if (err) throw err;
            console.log('File deleted!');
        });
}
  if(req.file){
    const updateuser=await User.findByIdAndUpdate(req.params.id,{first_name:req.body.first_name,last_name:req.body.last_name, profile_pic:req.file.path},{new:true});
       res.send({updateuser})
  }
} catch (e) {
        return res.status(500).json({ message: e.message })
    }
  })



  router.delete("/:id",async(req,res)=>{
      const user = await User.findByIdAndDelete(req.params.id,{new:true});
      res.send(user);
  })









router.get("/",async(req,res)=>{
    const allusers=await User.find({}).lean().exec();
    res.send(allusers)
})



module.exports = router;



