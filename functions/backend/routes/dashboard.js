const router = require('express').Router();
let datalake = require('../models/datalake.model');
let Dashboard = require('../models/dashboard.model');
let User = require('../models/user.model');

const fetch = require('node-fetch');
const SpotifyApi = require('spotify-web-api-node');

require('dotenv').config();


const tm_api = process.env.TICKETMASTER_KEY;
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;


const ticketmaster_api_url = 'https://app.ticketmaster.com/discovery/v2/events?'
const spotify_api_url = 'https://api.spotify.com/v1/'


router.use( function (req, res, next) {
    console.log(req.url, '@' ,Date.now());
    next();
});


const spotifyApi = new SpotifyApi({
    clientId: clientId,
    clientSecret: clientSecret
});

spotifyApi.clientCredentialsGrant()
.then(
    function (data) {
        spotifyApi.setAccessToken(data.body['access_token']);
    },
    function(err) {
        console.log('Something went wrong when retrieving an access token',err);
    }
);




async function getTmArtistEvents(artist){

    const apikey = 'apikey=' + tm_api;
    const keyword ='&keyword='+ artist;
    const locale = '&locale=*'
    const classification = '&classificationName=music';

    try{

    let d = await fetch(ticketmaster_api_url+apikey+keyword+locale+classification)
    .then(res => res.json());

    return d;
    } catch(err) {

        console.log(err);a
    }
};

async function getSpotifyArtist(artist){
    const url = spotify_api_url + 'search?q=' + artist + '&type=artist';


    const myOptions = {
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + spotifyApi.getAccessToken()
        },
        mode: 'cors',
        cache: 'default'
    };

    try{
        const artist = await fetch(url, myOptions)
        .then(res => res.json());

        return artist;
    } catch (err) {
        console.log(err);
    }
};
function convertSpaces(string){

    var newString = '';

    for (const c of string){
        if(c == ' '){
            newString += '%20';
        } else {
            newString += c;
        }
    }
    return newString;
}
async function getSpotifyArtistAlbum(artist){

    const encodedArtist = convertSpaces(artist);
    const otherParams = '&tag=new&type=album'
    const url = spotify_api_url + 'search?q=' + encodedArtist + otherParams;

    
    // console.log('This is the URL' + url);
    const myOptions = {
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + spotifyApi.getAccessToken()
        },
        mode: 'cors',
        cache: 'default'
    };

    try{
        const album = await fetch(url, myOptions)
        .then(res => res.json());
        return album;
    } catch (err) {
        console.log(err);
    }
};

function addEntry(dictionary, label, data){
    dictionary[label] = data;
}

function getTmPricerange(eventJson){

    // console.log(eventJson);
    var priceRanges = {
        'currency': 'Cannot get currency type.',
        'min': 'Cannot get min price.',
        'max': 'Cannot get max price.'
    }

    if(!eventJson._embedded.events[0]['priceRanges']){

        return priceRanges;

    } else {

        priceRanges['currency'] = eventJson._embedded.events[0]['priceRanges'][0]['currency'];
        priceRanges['max'] = eventJson._embedded.events[0]['priceRanges'][0]['max'];
        priceRanges ['min'] = eventJson._embedded.events[0]['priceRanges'][0]['min'];

        return priceRanges;
    }
};

async function getFavouriteArtists(artistList){
    var dashboardData = [];
    console.log(artistList);


    var i = 0;
    while(i < artistList.length){
        const basicArtistInfo = await Dashboard.findOne({artist_name : artistList[i]}).exec();
        dashboardData.push(basicArtistInfo);
        i += 1;
    }

    console.log("Successfully retrieved user artistlist");
    return dashboardData;
};


// Routes


router.route('').get( async (req,res) => {
    // res.json(req.query.id)

    User.findOne({_id: req.query.id})
    .then( async data => {
        if( data == null) {
            // console.log(req.query.id);
            console.log(data);
            // Generate the json for the dashboard
    
            // 2a. User with given ID not in database
            res.status(400).json('Not a valid user.');
        } else {
    
            // User with the given ID is in the database
            // 2b. Get the user's favourite list
            const favouriteArtists = data.following_list;      // Array
            
            // // 3. Fetch the artist dashboard information from the dashboard database, store them into a json and send it back as response
            const favouritesData = await getFavouriteArtists(favouriteArtists);
            res.json(favouritesData);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(400).json('Error: ' + err);
    });
    
    
});


router.route('/spotifyArtistlookup').post(async (req, res) => {

    const artist = await getSpotifyArtist(req.body.lookup);
    console.log(artist.artists.items[0]);
    res.json('Query Finished');
  
});


module.exports = router;

















