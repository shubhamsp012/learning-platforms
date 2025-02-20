const mongoose = require("mongoose");

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/LoginF')
}

let progre= require("./models/progress");

main().then(()=>{
    console.log("connecnt");
}).catch(err=>{console.log(err)});

let data = [{
    email :"Shubham Patil",
    progress :  65
}]

progre.insertMany(data);