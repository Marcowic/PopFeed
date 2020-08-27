const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const artistsSchema = new Schema(
    {
        artist_name: {type: String, required: true},
        spotify_id: {type: String, required: true},
        latest_event: {type: String},
        latest_event_url: {type: String},
        most_relevant_album: {type: String, required: true},
        most_relevant_album_release_date: {type: String, required: true},
        total_tracks: {type: String, required: true},
        currency: {type: String, required: true},
        min: {type: String, required: true},
        max: {type: String, required: true},
        twitter_screen_name : {type: String, required: true},
        personal_url: {type: String},
        twitter_id: {type: String, required: true},
        location: {type: String},
        twitter_url: {type: String, required: true},
        latest_status_id: {type: String, required: true},
        twitter_embed: {type: Object, required: true},
        youtube_id: {type: String, required: true},
        artist_description: {type: String, required: true},
        youtube_upload_id: {type: String, required: true},
        youtube_upload_title: {type: String, required: true},
        top_songs: {type: Array}

    },
    {
        timestamps: true
    }
    );

const artists = mongoose.model('artists', artistsSchema, 'artists');

module.exports = artists;