const mongoose = require("mongoose");

let data = mongoose.Schema({email:{
    type:String
},
coursaname:{
    type:String
},
progress:{
type:Number
}
})

let progress = mongoose.model("progre",data)

module.exports = progress;