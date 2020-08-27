const router = require('express').Router();
let Datalake = require('../models/datalake.model');
let Dashboard = require('../models/dashboard.model');
let User = require('../models/user.model');
let Artists = require('../models/artists.model');
const fetch = require('node-fetch');
const SpotifyApi = require('spotify-web-api-node');
const Twitter = require('twitter');
const { YoutubeDataAPI } = require('youtube-v3-api');
const {google} = require('googleapis');
require('dotenv').config();


const tm_api = process.env.TICKETMASTER_KEY;
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const twitter_access_token = process.env.TWITTER_ACCESS_TOKEN;
const ticketmaster_api_url = 'https://app.ticketmaster.com/discovery/v2/events?'
const spotify_api_url = 'https://api.spotify.com/v1/'
const twitter_api_url = 'https://api.twitter.com/1.1/'
const youtube_api_key = process.env.YOUTUBE_API_KEY;


const youtubeClient = new YoutubeDataAPI(youtube_api_key);

const twitterClient = new Twitter({
    consumer_key:process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
    // bearer_token: process.env.TWITTER_BEARER_TOKEN
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const spotifyApi = new SpotifyApi({
    clientId: clientId,
    clientSecret: clientSecret
});

router.use( function (req, res, next) {
    console.log(req.url, '@' ,Date.now());
    next();
});

// Functions

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
        response = [];
        response.push(artist.artists.items[0].name);
        response.push(artist.artists.items[0].id)
        // console.log(artist.artists.items);
        return response;
    } catch (err) {
        // The given artist to does NOT match ANY artist in Spotify API
        return null;
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
};
async function getSpotifyArtistAlbum(artist){

    const otherParams = '&tag=new&type=album'
    const url = spotify_api_url + 'search?q=' + artist + otherParams;

    
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
        // console.log(album)
        return album;
    } catch (err) {
        console.log(err);
    }
};

async function getTwitterUser(artist){

    const otherParams = 'users/search.json?q=' + artist;

    const myOptions = {
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer ' 
        }
    }
}

// function getTmPricerange(eventJson){


//     var priceRanges = {
//         'currency': 'Cannot get currency type.',
//         'min': 'Cannot get min price.',
//         'max': 'Cannot get max price.'
//     }

//     if(!eventJson._embedded.events[0]['priceRanges']){

//         return priceRanges;

//     } else {

//         priceRanges['currency'] = eventJson._embedded.events[0]['priceRanges'][0]['currency'];
//         priceRanges['max'] = eventJson._embedded.events[0]['priceRanges'][0]['max'];
//         priceRanges ['min'] = eventJson._embedded.events[0]['priceRanges'][0]['min'];

//         return priceRanges;
//     }
// };



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getTmContents(tmJson){
    var response = {};
    if(!tmJson['_embedded']){
        response['latest_event'] = 'No Events Found For ' + artistName;
        // console.log('No Events Found for '+ artistName);
        // response['latest_event'] = 'No event found.';
        // response['price_range'] =  {
        //     currency: 'n/a',
        //     min: 'n/a',
        //     max: 'n/a'
        // };
        response['currency'] = 'n/a';
        response['min'] = 'n/a'
        response['max'] = 'n/a'

        response['latest_event_link'] = 'n/a';

    } else {
        // addEntry(aggregate,'ticketmaster',tmJson);
        response['latest_event'] = tmJson._embedded.events[0].name;
        response['price_range'] =  getTmPricerange(tmJson);
        response['latest_event_url'] = tmJson._embedded.events[0].url
    }
    return response
};


async function getSpotifyContents(spotifyJSON){
    let response = {};
    // console.log(spotifyJSON);
    response['most_relevant_album'] = spotifyJSON.albums.items[0].name; 
    response['most_relevant_album_release_date'] = spotifyJSON.albums.items[0].release_date;
    response['total_tracks'] = spotifyJSON.albums.items[0].total_tracks;
    return response;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function getContents(artistName, tmJSON, spotifyJSON, youtubeChannelJSON, youtubeVideosJSON){
    let response = {};
    console.log('Getcontents entry')
    if(!tmJSON['_embedded']){
        response['latest_event'] = 'No Events Found For ' + artistName;
        // console.log('No Events Found for '+ artistName);
        // response['latest_event'] = 'No event found.';
        response['price_range'] =  {
            currency: 'n/a',
            min: 'n/a',
            max: 'n/a'
        };
        response['currency'] = 'n/a',
        response['min'] = 'n/a',
        response['max'] = 'n/a'

        response['latest_event_url'] = 'n/a';

    } else {
        console.log('Here')
        response['latest_event'] = tmJSON._embedded.events[0].name;
        // response['price_range'] =  getTmPricerange(tmJson);
        if(!tmJSON._embedded.events[0]['priceRanges']){
    
            response['currency'] = 'Cannot get currency.'
            response['max'] = 'Cannot get max price.'
            response['min'] = 'Cannot get min price.'
        
        } else {
        
            response['currency'] = tmJSON._embedded.events[0]['priceRanges'][0]['currency'];
            response['max'] = tmJSON._embedded.events[0]['priceRanges'][0]['max'];
            response ['min'] = tmJSON._embedded.events[0]['priceRanges'][0]['min'];
        
        }
        response['latest_event_url'] = tmJSON._embedded.events[0].url
    }
    response['date'] = Date.now();
    response['most_relevant_album'] = spotifyJSON.albums.items[0].name; 
    response['most_relevant_album_release_date'] = spotifyJSON.albums.items[0].release_date;
    response['total_tracks'] = spotifyJSON.albums.items[0].total_tracks;
    // console.log(youtubeChannelJSON);
    response['youtube_id'] = youtubeChannelJSON.items[0].id.channelId;
    response['artist_description'] = youtubeChannelJSON.items[0].snippet.description;

    response['youtube_upload_id'] = youtubeVideosJSON.items[0].id.videoId;
    response['youtube_upload_title'] = youtubeVideosJSON.items[0].snippet.title

    return response;
};

// function extractFromUrl(url){
//     // console.log(url);
//     const urlParts = url.split('/');

//     const tweetUrl = urlParts[0] + '//' + urlParts[2] + '/' +urlParts[3] + '/' + urlParts[4] + '/' + urlParts[5];

//     return tweetUrl;
// };

async function getYoutubeChannel(artistName){
    const url =   'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=' + artistName + ' - topic&type=channel&key=' + youtube_api_key

    try{
        const result = await fetch(url)
        .then(data => data.json());
        
        return result;

    } catch (err){
        console.log('Error: ' + err);
    };

};

async function getYoutubeVideo(youtubeChannelRaw){
    
    const url =   'https://www.googleapis.com/youtube/v3/search?part=snippet%2Cid&channelId='+ youtubeChannelRaw.items[0].id.channelId + '&maxResults=1&order=date&type=video&key='+ youtube_api_key;

    try{
    const result = await fetch(url)
    .then( data => data.json());

    return result;

    } catch (err) {
        console.log('Error: ' + err);
    };
};

async function getSpotifyTopSongs(spotify_id){
    const otherParams = '/top-tracks?country=US'
    const url = spotify_api_url +'artists/' + spotify_id+ otherParams;

    
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
        const songs = await fetch(url, myOptions)
        .then(res => res.json());
        // console.log(album)
        return songs;
    } catch (err) {
        console.log(err);
    }

};

async function getTopSongs(topSongs, artistName){
    var songsList = [];

    var counter = 0;

    while(counter < 10){
        var entry = {};
        entry['album_name'] = topSongs.tracks[counter].album.name;
        entry['album_release_date'] = topSongs.tracks[counter].album.release_date;
        entry['song_name'] = topSongs.tracks[counter].name;
        entry['track_number'] = topSongs.tracks[counter].track_number;
        entry['song_preview'] = topSongs.tracks[counter].preview_url;
        entry['artist_name'] = artistName;
        songsList.push(entry);

        counter += 1;
    }

    return songsList;

};
router.route('/search').get( (req,res) => {
    // Check if the user input is in the artists database
    var lookup = req.query.q;
    var formattedLookup = lookup.toLowerCase();


    Artists.findOne({artist_name : formattedLookup})
    .then(async data => {

        if (data == null){
            // If the artist name which was given as input is not in the Artists database

            // Search Spotify API for the first relevant artist given the user input, always returns an ACTUAL artist if available, otherwise returns null
            let aName = await getSpotifyArtist(formattedLookup);
            
            const spotify_id = aName[1];
            
            // If after querying Spotify using the user input as the keyword and the API still returned null then the user gave an input which does not match any artist
            if(aName[0] == null){
                res.json({result: null});
            }
            
            else{
                const artistName = aName[0].toLowerCase();
                // Spotify actually returned a legitimate artist from the user input
                // At this point check if the artist returned by Spotify is already in the Artists database
                Artists.findOne({artist_name: artistName})
                .then( async artistData => {


                    

                    if (artistData == null){
                        // If the artist is not yet in the Artists database
                        // Fetch all the data required for the artist
                        // Store evertyhing relevant found into the respective databases: 1. Datalake Database || 2. Artists Database || 3. Dashboard Database
                        // Finally return the relevant artist JSON for the **Artist Page**

                        // aggragate will contain the raw JSON to be stored in **DATALAKE DATABASE**
                        let aggregate = {};


                        // response will contain information
                        // Which will be displayed in the artist page


                        // Ticketmaster JSON response from Ticketmaster API for artist
                        const ticketMasterRaw = await getTmArtistEvents(artistName);
                        aggregate['ticketmaster'] = ticketMasterRaw;
                        console.log('Ticketmaster pass')
                        

                        // Spotify JSON response
                        const spotifyRaw = await getSpotifyArtistAlbum(artistName);
                        aggregate['spotify'] = spotifyRaw;
                        console.log('Spotify pass')
                        

                        // Youtube API JSON responses

                        // First youtube api call for the artist channel
                        const youtubeChannelRaw = await getYoutubeChannel(artistName);
                        aggregate['youtube_channels'] = youtubeChannelRaw;
                        console.log('Youtube channel pass')
                        


                        // Second youtube api call to get the artist video(s)
                        const youtubeVideoRaw = await getYoutubeVideo(youtubeChannelRaw);
                        aggregate['youtube_videos'] = youtubeVideoRaw;
                        console.log('Youtube video pass')


                        

                        const response = await getContents(artistName, ticketMasterRaw, spotifyRaw, youtubeChannelRaw,youtubeVideoRaw);
                        
                        const topSongs = await getSpotifyTopSongs(spotify_id);
                        
                        

                        


                        const topTenSongs = await getTopSongs(topSongs, artistName);
                        response['top_songs'] = topTenSongs;
                        aggregate['spotify_top_songs'] = topSongs;
                        

                        
                        // Twitter API wrapper
                        twitterClient.get('users/search', {q: artistName},(err, tweets, responses) =>{
                            aggregate['twitter_users'] = tweets;
                            console.log('Twitter Entry');
                            console.log('Twitter artist =' + artistName);
                            const mostRelevantArtist = tweets[0];           // The most relevant person with the given name/screen name/username 

                            
                            // Check if we did not find any users
                            if(mostRelevantArtist == undefined){
                                res.json('Did not find any relevant artist from Twitter.')
                            } else {
                    
                                // We found someone, check if they are verified
                                if(mostRelevantArtist.verified == true){
                                    
                                    response['twitter_screen_name'] = mostRelevantArtist.screen_name;
                                    // response['latest_tweet_id'] = mostRelevantArtist.status.id_str;
                                    response['personal_url'] = mostRelevantArtist.url;
                                    response['twitter_id'] = mostRelevantArtist.id_str;
                                    response['location'] = mostRelevantArtist.location;
                                    // const latest_status_url = extractFromUrl(mostRelevantArtist.status.entities.media[0].expanded_url);
                                    response['twitter_url'] = 'https://twitter.com/' + response['twitter_screen_name'];
                                    response['latest_status_id'] = mostRelevantArtist.status.id_str;

                    
                    
                                    twitterClient.get('statuses/oembed', {url: response['twitter_url'] + '/status/' + response['latest_status_id']}, (err, tweet, responses) => {
                                        aggregate['twitter_user_status'] = tweet;

                                        response['twitter_embed'] = tweet;

                                        
                                        const newDatalakeEntry = new Datalake({
                                            artist_name: artistName,
                                            contents: aggregate
                                        });
                
                                        newDatalakeEntry.save()
                                        .then(() => console.log('Entry Added to the datalake'));
                
                
                                        const newDashboardEntry = new Dashboard({
                                            artist_name: artistName,
                                            latest_event: response['latest_event'],
                                            spotify_id: spotify_id,
                                            latest_event_url: response['latest_event_url'],
                                            most_relevant_album: response['most_relevant_album'],
                                            most_relevant_album_release_date: response['most_relevant_album_release_date'],
                                            total_tracks: response['total_tracks'],
                                            currency: response['currency'],
                                            min: response['min'],
                                            max: response['max'],
                                            twitter_url: response['twitter_url'],
                                            youtube_upload_id: response['youtube_upload_id'],
                                            youtube_upload_title: response['youtube_upload_title']



                                        });
                
                                        
                                        newDashboardEntry.save()
                                        .then(()=> console.log('Entry Added to the dashboard'));



                                        console.log('Enter');
                                        console.log(response['location'])
                                        const newArtistEntry = new Artists({
                                            artist_name: artistName,
                                            latest_event: response['latest_event'],
                                            latest_event_url: response['latest_event_url'],
                                            spotify_id : spotify_id,
                                            most_relevant_album: response['most_relevant_album'],
                                            most_relevant_album_release_date: response['most_relevant_album_release_date'],
                                            total_tracks: response['total_tracks'],
                                            currency: response['currency'],
                                            min: response['min'],
                                            max: response['max'],
                                            twitter_screen_name : response['twitter_screen_name'],
                                            personal_url: response['personal_url'],
                                            twitter_id: response['twitter_id'],
                                            location: response['location'],
                                            twitter_url: response['twitter_url'],
                                            latest_status_id: response['latest_status_id'],
                                            twitter_embed: response['twitter_embed'],
                                            youtube_id: response['youtube_id'],
                                            artist_description:response['artist_description'],
                                            youtube_upload_id: response['youtube_upload_id'],
                                            youtube_upload_title:response['youtube_upload_title'],
                                            top_songs: response['top_songs']
                                        });
                                        newArtistEntry.save()
                                        .then(() => console.log('Entry Added to the artists'));


                                        res.json(response);
                    
                                    });

                                } else {
                                    // .......
                                    // response['twitter_screen_name'] = 'User is unverified';
                                    // response['personal_url'] = 'n/a';
                                    // response['twitter_id'] = 'n/a';
                                    // response['location'] = 'n/a';
                                    // // const latest_status_url = extractFromUrl(mostRelevantArtist.status.entities.media[0].expanded_url);
                                    // response['twitter_url'] = 'https://twitter.com/' + response['twitter_screen_name'];
                                    // response['latest_status_id'] = 'n/a';


                                    console.log('User is not verified')
                                    res.json(response);
                                }
                            }        
                        })
                    

                    }

                    else {
                        // If the artist is in the Artist Database
                        // That means that data has already been fetched for this artist before (other users have aready queried for the same artist)
                        // Query the Artists database to get the JSON for the artist, containing data for the **Artist page**
                        console.log('Found artist data for the spotify recognised artist')
                        res.json(artistData);
                    }

                })
                .catch(err => res.status(400).json('Error: ' + err));
            }''
        }


        else{
            // If the user input directly matches an artist name in the Artists database
            // Return the Artist data as response
            console.log('Found artist data directly from')
            res.json(data);


        }
    })
    .catch(err => res.status(400).json('Error: '+ err));
});



async function getArtistPage(artistList){
    response = [];

    var i = 0;
    while(i < artistList.length){
        const basicArtistInfo = await Dashboard.findOne({artist_name: artistList[i]}).exec();
        response.push(basicArtistInfo);
        i += 1;
    }
    return response;

}

router.route('').get( (req, res) => {
    User.findOne({_id: req.query.id})
    .then(async data => {
        const artists = data.following_list
        // res.json(artists);
        const response = await getArtistPage(artists);
        res.json(response);

    })
    .catch(err => res.status(400).json('Error :' + err));
});



module.exports = router;