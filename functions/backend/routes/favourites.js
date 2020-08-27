const router = require('express').Router();
let Users = require('../models/user.model');

router.use( function (req, res, next) {
    console.log(req.url, '@' ,Date.now());
    next();
});


router.route('').get((req,res) => {
    Users.findOne({_id: req.query.id})
    .then(async user => {
        if(user == null){

            res.status(400).json('Not a valid user.')

        } else {

            const favouritesList = user.favourites_list;
            // console.log(favouritesList);
            res.json(favouritesList);
        }
    })
    .catch(err => res.status(400).json('Error: ' + err));

    
});


module.exports = router;