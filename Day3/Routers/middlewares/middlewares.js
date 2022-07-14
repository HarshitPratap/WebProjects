//midleware to protect route from unauthorize access
function isLogin(req,res,next){
    if(req.isAuthenticated())
        return next();
    res.redirect('/auth/');
}

//to protect routes if not login
function isNotLogin (req,res,next) {
    if(!req.isAuthenticated())
        return next();
    res.redirect('/');
}

module.exports = { isNotLogin, isLogin };