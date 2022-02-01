const express = require('express');
const app = express();

const port =  process.env.PORT || 5000;

// Server listening on the port
app.listen(port,()=>{
    console.log(`App running on port ${port}`);
});