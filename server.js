const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const User = require('./user');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Faculty = require('./faculty');
const Attandence = require('./attandence');
const console = require('console');

const app = express();

const JWT_Secret = 'I am long secret string';

const port = process.env.PORT || 5050;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());

//Connection to the database
mongoose.connect("mongodb://localhost:27017/CMS", {
     useNewUrlParser: true,
     useUnifiedTopology: true,
});

// Routes
//Rendering the login page
app.get("/", (req, res) => {
     res.sendFile(path.join(__dirname, "/Student/login.html"));
});

//Rendering the login page
app.get("/login.html", (req, res) => {
     res.sendFile(path.join(__dirname, "/Student/login.html"));
});

//Rendering the Dashboard
app.get("/Dashboard.html", (req, res) => {
     res.sendFile(path.join(__dirname, "/Student/Dashboard.html"));
     // res.sendFile(path.join(__dirname,'/Student/jquery.easypiechart.js'));
     // res.sendFile(path.join(__dirname,'/Student/main.js'));
});

//Rendering the attandence
app.get("/attandence.html", (req, res) => {
     res.sendFile(path.join(__dirname, "/Student/attandence.html"));
});

//Rendering the enrollment
app.get("/Enrollment.html", (req, res) => {
     res.sendFile(path.join(__dirname, "/Student/Enrollment.html"));
});

//Rendering the fee
app.get("/Fee.html", (req, res) => {
     res.sendFile(path.join(__dirname, "/Student/Fee.html"));
});

//Rendering the profile
app.get("/profile.html", (req, res) => {
     res.sendFile(path.join(__dirname, "/Student/profile.html"));
});

//Rendering the results
app.get("/results.html", (req, res) => {
     res.sendFile(path.join(__dirname, "/Student/results.html"));
});

//Rendering the subject
app.get("/subject.html", (req, res) => {
     res.sendFile(path.join(__dirname, "/Student/subject.html"));
});

//Rendering the Admin-Add-Subject
app.get("/admin.html", (req, res) => {
     res.sendFile(path.join(__dirname, "/Student/admin.html"));
});

// Logining in to the dashboard
// app.post('/CMS/Dashboard', async (req,res)=>{
//     const {username, password} = req.body;
//     // .leans returns json sort of representation of the data from mongodb
//     const user = await User.findOne({ username }).lean();
//     // console.log(user);
//     if(!user){
//         return res.json({status:'error',error: 'Invalid username/password'});
//     }
//     if(await bcrypt.compare(password,user.password)){
//          // User matched 
//         const token = jwt.sign({ id: user._id, username: user.username }, JWT_Secret );
//         console.log("Reacher ")
//         res.sendFile( "C:/Users/SAEED COMPUTERS/Desktop/cms/Student/Dashboard.html");
//         res.json({status:'ok', data: 'Login successfull'});
//     }
//     res.json({status: 'error', error: 'Invalid username/password'});
//  });

// Login process
// app.post('/login', (req,res)=>{
//     try {
//         console.log(req.body);
//         const username1 = req.body.username;
//         const password2 = req.body.password;
//         console.log(username1 + " " + password2)

//         const uname =  User.findOne({username:username1});
//          console.log(uname);

//         if(uname.password === password2){
//             console.log("rendering ");
//             res.sendFile(path.join(__dirname, "/Student/Dashboard.html"));
//         }

//         // console.log(`${username} and ${password}`);
//     } catch (error) {
//         res.status(400).send("Invalid user");
//     }
// });

// Login for the user
app.post("/login", async (req, res) => {
    try {
      const mail = req.body.username;
      const password = req.body.password;
      const findMail = await User.findOne({
        username: mail,
      });
  
      if (findMail.password == password) {
        res.json({ Verified: true, Username: mail });

    } else {
        res.send("Password are not matching");
      }
    } catch (err) {
      console.log("error");
    }
  });

// Registring the Student
app.post('/admin/register', async (req,res)=>{
    console.log(req.body);
    const { username, password: plainTextPassword } = req.body;
 
    if(!username || typeof username !="string"){
        alert("Choose a valid username");
        return res.json({status:'error', error: 'Invalid username'});
    }
 
    if(!plainTextPassword || typeof plainTextPassword !="string"){
        alert("Choose a valid password")
        return res.json({status:'error', error: 'Invalid password'});
    }
 
    if(plainTextPassword.length < 5){
        alert("The length of your password should be atleast 6 characters");
        return res.json({status:'error', error: 'Password too small. Its length should be atleast 6 characters.'})
    }
    const password = await bcrypt.hash(plainTextPassword,10);
 
    try {
        const response = await User.create({
            username,
            password
        });
        console.log("User created successfully ", response);
        res.sendFile(path.join(__dirname, "/Student/admin.html"));
    }    
     catch (error) {
         console.log(error);
     //    console.log(JSON.stringify(error));
        if(error.code === 11000){
            // Duplicate Key
            return res.json({status: 'Error', error: 'Username already in use'});
        }
        throw error; 
    } 
    // salt is the number of iterations you want to run on password
    console.log(await bcrypt.hash(password,10)); 
    // It will automatically set the headers instead of manually setting them
    res.json({status: 'ok'});
 });

//Rendering the Admin attandence
app.get('/adm_attandance.html',(req,res)=>{
    res.sendFile(path.join(__dirname, '/Admin/adm_attandance.html')); 
});

//Rendering the Admin Enroll Student
app.get('/adm_enroll_student.html',(req,res)=>{
    res.sendFile(path.join(__dirname, '/Admin/adm_enroll_student.html')); 
});

//Rendering the Admin Dashboard
app.get('/adm_dashboard.html',(req,res)=>{
    res.sendFile(path.join(__dirname, '/Admin/adm_dashboard.html')); 
});

//Rendering the faculty login page
app.get('/faculty_login.html',(req,res)=>{
    res.sendFile(path.join(__dirname, '/Admin/faculty_login.html'));
});

//Rendering faculty enter page
app.get('/Enter_result.html',(req,res)=>{
    res.sendFile(path.join(__dirname, '/Admin/Enter_result.html'));
});

// login for the faculty 
app.post("/faculty_login", async (req, res) => {
    try {
      const mail = req.body.username;
      const password = req.body.password;
      const findMail = await Faculty.findOne({
        username: mail,
      });
  
      if (findMail.password == password) {
        res.json({ Verified: true, Username: mail });

    } else {
        res.send("Password are not matching");
      }
    } catch (err) {
      console.log("error");
    }
  });

//Setting the username
app.get("/getStudentDetails/:username", function (req, res) {
    User.findOne({ username: req.params.username })
    .then(student => res.json(student));
}
);

//Setting the email of faculty
app.get("/getFacultyDetails/:username", function (req, res) {
    Faculty.findOne({ username: req.params.username })
    .then(student => res.json(student));
}
);

//Getting student attandence
app.get('/getStudentAttandence/:name/:course',(req,res) => {
    Attacdence.find({ name: req.params.name, course:req.params.course})
    .then(student=> res.json(student));
});

//To take attandence from the database
app.post("/attandence", async (req, res) => {
    try {
      const name = req.body.name;
      const course = req.body.course;
      const findAttandence = await Attandence.find({
        name: name,
      });
  
      if (findAttandence.name == name || findAttandence.course == course) {
        res.json({ Verified: true, name: name, course: course });

    } else {
        res.send("Password are not matching");
      }
    } catch (err) {
      console.log("error");
    }
  });

// Server listening on the port
app.listen(port, () => {
     console.log(`App running on port ${port}`);
});
