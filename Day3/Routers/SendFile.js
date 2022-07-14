const router = require('express').Router();
const multer = require('multer');
const Files = require('../DB/FilesModel');
const bcrypt = require('bcryptjs');
const path = require('path');
const nodemailer = require('nodemailer');
const passport = require('passport');
const {isLogin} = require('./middlewares/middlewares');

//creating mail options
const mailtransport = nodemailer.createTransport({
    service:"Gmail",
    host:'smtp.gmail.com',
    auth:{
        user:process.env.USER,
        pass:process.env.PASSWORD
    }
});

//configuring multer to upload file
var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, './public/uploads');    
    }, 
    filename: function (req, file, cb) { 
       cb(null , new Date().getTime()+"-"+path.extname(file.originalname));   
    }
 });

const uploads = multer({
    storage: storage
});

//get route to render form
router.get('/', isLogin, (req,res) => {
    res.render('sendfile');
});

//post route to upload file
router.post('/uploads', uploads.single('file'), async (req, res) => {
    const filedata = {
        email:req.body.email,
        path:req.file.path,
        originalName:req.file.originalname,
    } 
    if (req.body.password != null && req.body.password !== "") {
        filedata.password = await bcrypt.hash(req.body.password, 10);
    }
    const file = await Files.create(filedata);
    const str = req.body.password ? `<p>Password is:-</p>${req.body.password}<br/>`:'';
    const mailopt = {
        from:process.env.USER,
        to:req.body.email,
        subject:"File download link",
        html:`<p>Please follow the link to download your file</p><br/>${str}
        <a href="${req.headers.origin}/sendfile/file/${file.id}">Click Here</a>`
    }
    mailtransport.sendMail(mailopt ,function (error,resp) {
        if(error){
            res.render('sendfile', {
                status : false,
                message : "Something went wrong."
            });
            return;
        }else if(resp){ 
            res.render('sendfile', {
                status : true,
                message : "File uploaded and mail sent."
            }); 
            return;           
        }
    });
});

//route to get file from db to download
//router.route("/file/:id").get(getFile).post(getFile);
router.get("/file/:id", getFile);
router.post("/file/:id", getFile);

async function getFile(req,res){
    const file = await Files.findById(req.params.id);
    if(file.password != null){  
        if(req.body.password == null){
            res.render("files");
            return;
        }
        if(!(await bcrypt.compare(req.body.password, file.password))){
            res.render("files", {
                error : true
            });
            return; 
        }
    }
    file.downloadCount++;
    await file.save();
    console.log(file.downloadCount);
    res.set({
        'Location':`${req.headers.origin}/`
    });
    res.download(file.path, file.originalName);
    //res.redirect('/');
}

module.exports = router;