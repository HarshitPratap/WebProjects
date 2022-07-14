const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const conn = require("./DBConfig/DBConfig");
const authRouter = require("./Routers/AuthRouter");

const app = express();
const PORT = 5000;
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/auth',authRouter);
//app.use(bodypParser(bodypParser.json()));

// app.get('/',(req,res) =>{
//     conn.query("SELECT * from users",(err,result,fields) =>{
//         res.status(200).json(result);
//     });
// });

app.listen(5000|PORT ,()=>{
    console.log("Connected Up and runing....");
})
