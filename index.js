const express = require("express");
const app = express();

const mongoose = require("mongoose");

const path =  require("path");
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
const methodoverride = require("method-override");
app.use(methodoverride("_method"));

const login = require("./models/login.js");
const about = require("./models/About.js");
const quiz = require("./models/quiz.js");
const progress = require("./models/progress.js")

//const { console } = require("inspector");
app.use(express.urlencoded({extended:true}));

const port = 3000;

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/LoginF');
}

main().then(()=>{
    console.log("connect db");
}).catch(err=>
    console.log(err))


app.listen(port,()=>{
    console.log("run server");
})

app.get("/",(req,res)=>{
  //res.send("working")
 
 res.render("login.ejs");
})

app.get("/Home",(req,res)=>{
    let { email } = req.query;
    //console.log(email); 
    res.render("main.ejs",{email});
})

app.get("/Home/About/:email",(req,res)=>{
   let { email }= req.params
    res.render("About.ejs",{ email });
})

app.get("/Profile/:email",(req,res)=>{
   let  {email} = req.params
    res.render("profile.ejs",{email})
})

app.get("/show",(req,res)=>{
let email = "shubham.patil@gmail.com";
    res.render("show",{email});

})

app.post("/About/feedbacksubmit/:email",async(req,res)=>{
    let {name , email , feedback} = req.body;
    let data = about({
        name : name ,
        email : email,
        feedback : feedback
    })
    console.log(req.body)
let savefeedback =await data.save();
   res.redirect(`/Home/About/${email}`);
})

app.post("/login", async (req,res)=>{
let {email , password} = req.body;

//console.log(email)
let data = await login.findOne({email : email })

if (!data) {
    return res.send("Invalid username or password");
}

if(data.password === password){
    
    res.redirect(`/Home?email=${email}`);
}else{
    res.send("Invalid username or password")
}

})

app.get("/register",async (req,res)=>{
    //res.send("working")
    res.render("register.ejs");
})
app.post("/success",async(req,res)=>{
    let{email , password} = req.body;
    let savedb  = login({
        email : email,
        password : password
    })
    let datasave  = await savedb.save()
   // console.log(datasave);
    //console.log(datasave);
    res.redirect("/");
})

app.get("/forgot-password",(req,res)=>{
    res.render("forgot");    
})

app.put("/reset-password",async(req,res)=>{
    let { email , password , confirm_password } = req.body;
    console.log(email);
    if(password === confirm_password){
    let update  = await login.findOneAndUpdate({email:email},{ password : confirm_password },{runValidators : true, new : true});
    res.redirect("/");
    } else{
        res.send("New Password and confirm password are different");
    }
})


app.get("/courses/:email",(req,res)=>{
    let {email} = req.params
    //let {coursename} = req.body
   // console.log(coursename);
    res.render("course",{email})

})

app.get("/course/:coursename/:email([a-zA-Z0-9@.]+)", async(req,res)=>{
    //console.log("Params:", req.params);
    let {email , coursename } = req.params
    res.render("cprogram",{email , coursename });

})


app.get("/course/:coursename/Introduction/:email", async (req,res)=>{
    let {email , coursename } = req.params
    res.render("Introduction",{email})
})

app.get("/course/:coursename/Quiz/:email",async(req,res)=>{
   let{ email }=req.params
   let ExistEmail = await progress.findOne({email : email})
    //console.log("shubham",ExistEmail);
    
    
   if(!ExistEmail){
    let data  = await quiz.find()
    res.render("quiz1",{data ,email })
    }else{
        res.redirect(`/course/:coursename/result/:${email}`)
    }
    
})
app.post("/course/:coursename/result/:email",async(req,res)=>{
    let {email , coursename }=req.params;
    let answer = req.body;
    let score = 0 ;
    try{
    let quizdata = await quiz.find({})
    quizdata.forEach((q,index)=>{
        if(answer[`answer-${index}`] === q.correctAnswer){
            score++;
        }
    });
    let emailExist = await progress.findOne({email : email , coursaname : coursename});
    let p =( (score / 90 ) * 100).toFixed(2) ;
    if(!emailExist){
      
       let data = progress({
        email : email,
        coursaname : coursename,
        progress : p
    })    
   let savedata =await data.save();
   console.log("save in database ",savedata);
   res.render('result', { score, total: quizdata.length ,p , email , coursename });
}else{
    console.log("already exists");
    res.render('result', { score, total: quizdata.length ,p , email , coursename });
}    
}catch(err){
    console.log(err);
}
})

app.get("/test",async (req,res)=>{
    let p = await progress.find({});
    console.log("data",p);
    res.send(p);
})