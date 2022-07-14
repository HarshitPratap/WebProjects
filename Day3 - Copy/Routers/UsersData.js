const UserModel = require('../DB/UserModel');

const router = require('express').Router();

router.get('/', async (req,res) => {
    if(!req.user){
        res.status(401).json({
            status:false,
            message:"Unauthorized."
        });
        return;
    }
    const users = await UserModel.find({});
    res.status(200).json({
        status:true,
        user:users
    });
});
module.exports = router;