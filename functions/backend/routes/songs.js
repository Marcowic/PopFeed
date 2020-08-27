const router = require('express').Router();
let Users = require('../models/user.model');
let Artist = require('../models/artists.model');

router.use( function (req, res, next) {
    console.log(req.url, '@' ,Date.now());
    next();
});



async function getFollowingSongs(artistList){
    songsList = [];

    var i = 0;
    while(i < artistList.length){
        const artist = await Artist.findOne({artist_name : artistList[i]}).exec();
        var counter = 0;
        while(counter < 4){

            songsList.push(artist.top_songs[counter]);

            counter += 1;
        }
        i += 1;
    };

    // console.log("Successfully retrieved songlist");
    return songsList;
};

router.route('').get((req,res) => {
    Users.findOne({_id: req.query.id})
    .then(async user => {
        if(user == null){

            res.status(400).json('Not a valid user.')

        } else {

            const artistList = user.following_list;

            const songs = await getFollowingSongs(artistList);

            res.json(songs);
        }
    })
    .catch(err => res.status(400).json('Error: ' + err));

    
});


module.exports = router;