const mongoose = require("mongoose");

let data = new  mongoose.Schema({ email:{
    type : String,
    required : true
},
password : {
    type : String,
    required : true
}
});

let login =  mongoose.model("LoginForm" , data);
module.exports= login;