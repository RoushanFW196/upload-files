

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

first_name: {type: 'string',required: true},
last_name: {type: 'string',required: true},
profile_pic: {type: 'string',required: true}


},{
    versionKey:false,
    timeStamp:true
})


const User= mongoose.model("user",userSchema);




module.exports = User;
