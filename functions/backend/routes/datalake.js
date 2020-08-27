const router = require('express').Router();
let Dump = require('../models/datalake.model');

router.use( function (req, res, next) {
    console.log(req.url, '@' ,Date.now());
    next();
});

router.route('').get((req,res) => {
    Dump.find()
        .then(dump => res.json(dump))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/find').get((req,res)=> {
    Dump.find({description: req.query.description})
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err))

});



module.exports = router;