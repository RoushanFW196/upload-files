

const express= require("express");
const connect = require("./config/db.js");

const app = express();

app.use(express.json());

const usercontroller= require("./controllers/user.controller.js")

const gallerycontroller= require("./controllers/gallery.controller.js")


app.use("/users",usercontroller)
app.use("/gallery", gallerycontroller)

 console.log("hello")
app.listen("1500",async()=>{

    await connect();
    console.log("listening on port 1500")

})