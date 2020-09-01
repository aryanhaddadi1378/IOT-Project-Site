var express = require('express');

var router = express.Router();


router.get('/', function(req, res, next) {
  if (req.loginned) {
    res.render("dashboard.html",{
      groupName:req.loginned.groupn,
      members:req.loginned.membs,
      chanid:req.loginned.chanid
    })
  }
  res.redirect("/login");
});


router.get("/signup",function(req,res,next){
  if (!req.loginned){
    res.render("signup.html")
  }
  else {
    res.redirect("/");
  }  
});


router.get("/login",function(req,res,next){
  if (!req.loginned) {
    res.render('login.html')
  }
  else {
    res.redirect("/");
  }  
});


router.get('/signout', function(req, res, next) {
  res.clearCookie("Authentication")
  res.redirect("/");
});

module.exports = router;
