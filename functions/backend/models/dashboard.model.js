const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dashboardSchema = new Schema(
    {
        artist_name: {type: String, required: true},
        spotify_id: {type: String, required: true},
        latest_event: {type: String, required: true},
        latest_event_url: {type: String, required: true},
        most_relevant_album: {type: String, required: true},
        most_relevant_album_release_date: {type: String, required: true},
        total_tracks: {type: String, required: true},
        currency: {type: String, required: true},
        min: {type: String, required: true},
        max: {type: String, required: true},
        twitter_url: {type: String, required: true},
        youtube_upload_id: {type: String, required: true},
        youtube_upload_title: {type: String, required: true}
    },
    {
        timestamps: true
    });

const Dashboard = mongoose.model('dashboard', dashboardSchema, 'dashboard');

module.exports = Dashboard;