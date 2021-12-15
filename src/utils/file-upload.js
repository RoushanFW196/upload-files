
const multer= require("multer");
const path= require("path");
const fs= require("fs");
const storage=multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,path.join(__dirname,"../uploads"))
    }, 

    filename:function(req,file,callback){
       // callback(null,new Date().toISOString()+file.originalname)
        //callback(null,new Date().toISOString()+file.originalname)
        const uniqueprefix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        callback(null, uniqueprefix +"-"+file.originalname);

    }
})

const fileFilter=function(req,file,callback){
    if(file.mimetype==="image/jpeg" || file.mimetype==="image/png"){
        callback(null,true)
    }else{
        callback(null,false)
    }
}






const upload= multer({
    storage: storage,
    Limits:{
        fileSize:1024*1024*5
    },
    fileFilter:fileFilter,
});


module.exports =upload;