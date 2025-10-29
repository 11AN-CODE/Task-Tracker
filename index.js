const express=require('express');
const app=express();
const usermodel=require('./models/user');
const taskmodel=require('./models/task');
const bcrypt=require("bcrypt");
const cookies = require('cookie-parser');
const jwt=require("jsonwebtoken");
const user = require('./models/user');
const port = process.env.PORT || 5000


app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookies());


function isLoggedIn(req,res,next)
{
      if(!req.cookies.token){
            res.redirect('/login')
        }
        try{
            let data=jwt.verify(req.cookies.token,"hhhh")
            req.userid = data.userid;
            next()
        }catch(error){
            console.error("JWT Verification Error:", error.message);
            // Redirect to login on any verification error
            res.redirect('/login');
        }
}
app.get('/',(req,res)=>{
    res.render('register');
})


app.post("/register",async(req,res)=>{
    let{name,email,password}=req.body;

    let alreadyregistered=await usermodel.findOne({email});
    if(alreadyregistered) return res.status(500).send("user already registered");

    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async(err,hash)=>{
            let usercreated= await usermodel.create({
        name,
        email,
        password:hash
})
let token=jwt.sign({email:email,userid:usercreated._id},"hhhh")
res.cookie('token',token);
res.redirect('/login');
})
}
)

})


app.post('/login',async(req,res)=>{
    {
        let {email,password}=req.body;
        let loggedIn=await usermodel.findOne({email});
        if(!loggedIn)
            { return res.status(500).send("Invalid User")

            }
else{
    bcrypt.compare(password,loggedIn.password,(err,result)=>{
        if(result){
            let token=jwt.sign({email:email,userid:loggedIn._id},"hhhh")
            res.cookie('token',token)
            res.redirect('/tasks');

        }
        else{
            return res.status(500).send("invalid User")
        }
        
    })
    
}
}
})



app.get('/login',(req,res)=>{
    res.render('login');
});


app.get("/logout",(req,res)=>{
    res.clearCookie('token');
    res.redirect('/login'); 
})

 


app.post("/createtask",isLoggedIn,async(req,res)=>{
    let{title,description,status}=req.body;

    try{
        let usercreatedtask=await taskmodel.create({
            title,
            description,
            user:req.userid,
            status:status

        })
        res.redirect("/tasks");
    }
    catch(error){
        return res.status(500).send("error occured while creating task");
    }

    

})

app.get("/tasks",isLoggedIn,async(req,res)=>{
    try{
        // 1. Get the tasks for the user ID
        const tasks=await taskmodel.find({user:req.userid});
        
        // 2. ✨ FIX 2: Fetch the full user details using the ID
        const userDetails = await usermodel.findById(req.userid);

        if (!userDetails) {
            // Should not happen if the token is valid, but good to check
            return res.status(404).send("User details not found.");
        }

        // 3. Pass the full user object to the view
        res.render('tasks', { 
            tasks: tasks, 
            user: userDetails // <-- userDetails has the .name property
        });
    }
    catch(error){
        console.error(error); // Helpful for debugging
        return res.status(500).send("Error occurred while fetching tasks");
    }
})



app.listen(port,()=>{
    console.log(`server running on ${port}` )

});