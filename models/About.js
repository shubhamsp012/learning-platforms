const mongoose =  require("mongoose");

let data = new mongoose.Schema({ name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
feedback:{
    type:String,
    required:true
}
})

let about = mongoose.model("About",data);
module.exports = about;