const express = require('express');
const path = require('path');
const app = express();

const port =  process.env.PORT || 5000;

app.use(express.static(__dirname +'/public'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/Student/first.html'));
});

// Server listening on the port
app.listen(port,()=>{
    console.log(`App running on port ${port}`);
});