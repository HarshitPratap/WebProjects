//router.post('/register',async (req,res) => {
    //     const userData = {
    //         username:req.body.username,
    //         email:req.body.email,
    //         password: await bcrypt.hash(req.body.password, 10)
    //     };
    //     const userExist = await Users.findOne({email: userData.email});
    //     if(userExist){
    //         res.status(401).json({
    //             status:false,
    //             message:"User already exist with email."
    //         });
    //         return;
    //     }
    //     const user = await Users.create(userData);
    //     if(!user){
    //         res.status(401).json({
    //             status:false,
    //             message:"Something went wrong."
    //         });
    //         return;
    //     }
    //     res.status(201).json({
    //         status:true,
    //         message:"User created successfully.",
    //         user:user
    //     });
    // });
    
    // router.post('/login', async (req,res)=>{
    //     const user = await Users.findOne({email: req.body.email});
    //     if (!user) {
    //         res.status(401).json({
    //             status:false,
    //             message:"User doesn't exits."
    //         });
    //         return; 
    //     }
    //     if (!(await bcrypt.compare(req.body.password, user.password))) {
    //         res.status(401).json({
    //             status:false,
    //             message:"Password incorrect."
    //         });
    //         return;
    //     }
    //     const payload = {
    //         id:user._id,
    //         email:user.email,
    //         username:user.username
    //     }
    //     const token = jwt.sign(payload,process.env.SECRET,{expiresIn:"1d"});
    //     res.status(200).json({
    //         status:true,
    //         token:`Bearer ${token}`
    //     });
    //});
    