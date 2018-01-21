const express = require("express");
const router = express.Router();
const Answer = require("../models/answers");

router.use((req, res, next) => {
  console.log(`${req.method} made to ${req.path} at ${new Date(Date.now())}`);
  next();
});

router.get("/", (req, res, next) => {
  res.render("landingPage");
});
router.post("/", (req, res, next) => {
  
  let name = req.body.name;
  let email = req.body.email;
  let choice = req.body.gender;

  req.check("name", "Name is required.").notEmpty();
  req.check("email", "Email is required.").notEmpty();
  req.check("email", "Email is not valid.").isEmail();

  let errors = req.validationErrors();
  if (errors) {
    res.render("landingPage", { errors });
  } else {
    let newAnswer = new Answer({
      name: name,
      email: email,
      choice: choice
    });
    /* Answer.saveAnswer(newAnswer, (err, answer) => {
      if (err) {
        if (err.code === 11000) {
          res.render("landingPage", {errors: {message:`The email ${newAnswer.email} is already in use. Please use a different one.`}});
        }
      }
      if(answer){
        req.flash("success_msg", "Thank you for your answer");
        res.redirect("/results");
      }
    });  */
    res.render('results');
  }
});
router.get("/results", (req, res, next) => {
  Answer.find({}, {_id:0,email:0,__v:0},(err, answers)=>{
    if(err){ 
      console.error(err);
      res.render('results',{err});
    }else{
      res.render('results',{answers: answers});
    }
  });
});
router.get("/reveal",(req,res,next)=>{
  res.render('reveal');
});
module.exports = router;
