const express = require('express');
const path = require('path');
const app = express();

const port =  process.env.PORT || 5000;

app.use(express.static(__dirname +'/public'));

// Routes
//Rendering the login page
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/Student/first.html'));
});

//Rendering the login page
app.get('/first.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'/Student/first.html'));
});

//Rendering the Dashboard
app.get('/Dashboard.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'/Student/Dashboard.html'));
});

// Server listening on the port
app.listen(port,()=>{
    console.log(`App running on port ${port}`);
});