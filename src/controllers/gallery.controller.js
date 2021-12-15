
const express=require('express');
const path=require('path');

const multer=require('multer');
const router=express.Router();
const fs=require('fs');
const upload=require('../utils/file-upload.js');

const Gallery=require('../models/gallery.model.js');




router.post("/multiple" , upload.any("pictures",5),async (req,res)=>{
    
    console.log(req.body)
    const files=req.files.map((file)=>file.path)

    const upload_image=await Gallery.create({
        //images: files,
        pictures:files,
      user_id: req.body.user_id
       
    })

res.status(201).json({data:upload_image})

});

router.get("/",async(req,res)=>{
    const allpictures=await Gallery.find({}).lean().exec();
    res.send(allpictures)
})


router.delete("/:id",async(req,res)=>{
 

    try {
        const deleteGallery=await Gallery.findById(req.params.id).lean().exec()
    
               
               // console.log(deleteGallery)
                deleteGallery.pictures.forEach((el)=>{
                     fs.unlink(el, function (err) {
                        if (err) throw err;
                        console.log('File deleted!');
                    });
                })
    
                const gallery = await Gallery.findByIdAndDelete(req.params.id, { new: true })
                return res.status(200).send({ gallery });
            } catch (e) {
                return res.status(500).json({ message: e.message })
            }

})








module.exports = router;