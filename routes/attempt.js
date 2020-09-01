var mongoose = require('mongoose');
var express = require('express');
var bcrypt = require ("bcrypt");
var jwt = require("jsonwebtoken")
var router = express.Router();



var Schema = mongoose.Schema;
var GroupSchema = new Schema({
    members:[String],
    groupname:String,
    channelid:String,
    password:String
});

var Group = mongoose.model('Group',GroupSchema);


router.post('/signup', function(req, res, next) {
    var info = req.body;
    var newGroup = new Group({
        members:info["members1[]"],
        groupname:info.groupName,
        channelid:info.channelId,
        password:bcrypt.hashSync(info.password,10)
    });
    Group.find({groupname:newGroup.groupname},function(err,groups){ 
      if (err){
        res.json({ 
          message:"An error occured while trying to save your group information.Please try again",
          status:120
        });
      }
      else { 
        if (groups.length == 0) {
            newGroup.save(function(err){
             if (err) {
               res.json({ 
                message:"An error occured while trying to save your group information.Please try again",
                status:100
              });
            }
            res.json({
              message:"Signup successful",
              status:200
          });
            });    
        }
        else{ 
            res.json({
                message:"a group with the same group id already exists",
                status:300
            });
        }
      }
    });
  
});


router.post("/login",function(req,res,next){
  var info = req.body;
  Group.find({groupname:info.groupName1},function(err,users){
        if (err) {
          res.json({ 
            message:"An error occured while trying to login.Please try again",
            status:140
          });
        }
        else {
          if (users.length == 0) {
            res.json({
                message:"The group name you entered is incorrect",
                status:340
            });
        }
        else {
          if (bcrypt.compareSync(info.password1,users[0].password)) {
            var jwtToken = jwt.sign({
              groupn:info.groupName1,
              chanid:users[0].channelid,
              membs:users[0].members
            },"amaamaamarullllesssss",{expiresIn:"25m"});
            res.cookie("Authentication",`JAWMTA ${jwtToken}`, {httpOnly:true} );
            res.json({
                  status:200
            })
          }
          else {
            res.json({
              message:"The password you entered is incorrect",
              status:360
          });
          }
        }
      }
    });
});


module.exports = router;
