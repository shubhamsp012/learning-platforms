const mongoose = require("mongoose");
const login = require("./models/login.js");

async function main(){
  await  mongoose.connect('mongodb://127.0.0.1:27017/LoginF');

}

main().then((res)=>{
    console.log("connect db");
}).catch(err=>console.log(err))

let data = [{
    email : "patilshubhampramod@gmail.com",
    password : "shubh@123"
}]

login.insertMany(data);
