const mongoose = require("mongoose");

let newdata = new mongoose.Schema({question:{ type:String } , 

    options:{
        type : [String]
    },
    correctAnswer:{
        type:String
    }
} )

let quiz = mongoose.model("Quiz",newdata );
module.exports=quiz; 