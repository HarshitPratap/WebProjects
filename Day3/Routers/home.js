const router = require('express').Router();

//get route index page
router.get('/', (req,res) => {
    res.render('index');
});

module.exports = router;