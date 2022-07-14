const Router = require("express").Router();

Router.post('/register',(req,res) =>{
    console.log(req.body);
});

Router.post("/login", (req,res) =>{

})

module.exports = Router;