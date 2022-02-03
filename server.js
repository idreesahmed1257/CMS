const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const app = express();

const port = process.env.PORT || 5050;

app.use(express.static(__dirname + "/public"));

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

// Server listening on the port
app.listen(port, () => {
     console.log(`App running on port ${port}`);
});
