const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcrypt');

router.use( function (req, res, next) {
    console.log(req.url, '@' ,Date.now());
    next();
});


router.route('/register').post(async (req, res) => {
    if(req.body.firstname && req.body.surname && req.body.password && req.body.email){
    const password = await bcrypt.hash(req.body.password, 10);

    const firstname = req.body.firstname;
    const surname = req.body.surname;
    const email = req.body.email;
    const newUser = new User({firstname, surname, password, email});

    newUser.save()
        .then( () => {

            // res.json(newUser._id);
            res.json('User has successfully registered.')

        })
        .catch( err => res.status(400).json('Error: '+ err));
    } else{
        res.json("Missing Required Inputs!");
    }
});

router.route('/login').post(async (req, res) => {
    const user = await User.findOne({email: req.body.email}).exec();
    if(!user){
        return res.status(400).json("Invalid email");
    }
    if(!bcrypt.compareSync(req.body.password, user.password)){
        return res.status(400).json("Password does not match!");
    }
    res.json(user._id);
});

router.route('/verify').post( async (req, res) => {
    console.log(req);
     User.findById(req.body.id)
    .then(user => {

        if(!user){
            return res.status(400).json(null);
        } else{
            let name = user.firstname + ' ' + user.surname;
            res.json(name);
        }
    })
    .catch( err => res.status(400).json('Error: '+ err));

})

router.route('/addToFavouritesList').post(async (req,res) => {

    User.updateOne({_id: req.body.id},{$addToSet: {favourites_list: req.body.entry}})
    .then( () => res.json('Entry Added To Favourites!!'))
    .catch( err => res.status(400).json('Error: '+ err));
});

router.route('/removeFromFavouritesList').post(async (req,res) => {

    User.findOne({_id: req.body.id})
    .then( user => {
        const newFavs = user.favourites_list;
        var counter = 0;

        while(counter < newFavs.length){
            if(newFavs[counter].head == req.body.entry){
                newFavs.splice(counter,1)
                break;
            }
            counter += 1;
        };
        User.updateOne({_id: req.body.id},{favourites_list: newFavs})
        .then(() => res.json('Entry Removed From Favourites!!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch( err => res.status(400).json('Error: '+ err));
});

router.route('').get((req,res) => {
    User.findById(req.query.id)
    .then(user => {
        if(user != null){
            res.json(user);
        } else {
            res.status(400).json('No User Found.');
        }
    })
    .catch(err => res.status(400).json('Error: '+err));
});


router.route('/addToFollowingList').post(async (req,res) => {

    User.updateOne({_id: req.body.id},{$addToSet: {following_list: req.body.artist}})
    .then( () => res.json('Singer Added To Following!!'))
    .catch( err => res.status(400).json('Error: '+ err));
});

router.route('/removeFromFollowingList').post(async (req,res) => {

    User.updateOne({_id: req.body.id},{$pull: {following_list: req.body.artist}})
    .then( () => res.json('Singer Removed From Following!!'))
    .catch( err => res.status(400).json('Error: '+ err));
});


router.route('/addToSongList').post(async (req,res) => {

    User.updateOne({_id: req.body.id},{$addToSet: {song_list: req.body.song}})
    .then( () => res.json('Singer Added To Songs!!'))
    .catch( err => res.status(400).json('Error: '+ err));
});

router.route('/removeFromSongList').post(async (req,res) => {

    User.updateOne({_id: req.body.id},{$pull: {song_list: req.body.song}})
    .then( () => res.json('Singer Removed From Songs!!'))
    .catch( err => res.status(400).json('Error: '+ err));
});



router.route('/profileUpdate').post( async (req,res) => {

    var password = await bcrypt.hash(req.body.password, 10);

    User.updateOne({_id: req.body.id}, 
        {
            firstname: req.body.firstname,
            surname: req.body.surname,
            password: password,
            email: req.body.email
        })
        .then(() => {res.json('Updated User Profile.')})
        .catch(err => res.status(400).json('Error: ' + err))

});

module.exports = router;