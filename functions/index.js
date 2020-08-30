const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const functions = require('firebase-functions');
const fs = require('fs');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;



app.use(cors());
app.use(express.json());


mongoose.connect(uri, 
    {useNewUrlParser: true,
     useCreateIndex: true,
     useUnifiedTopology: true
    });

const db = mongoose.connection;

db.once('open', function(err) {
    try{
        console.log("MongoDB database connection established successfully!");
    }
    catch(err){
        console.log(err);
}});


const datalakeRouter = require('./backend/routes/datalake');
const usersRouter = require('./backend/routes/users');
const dashboardRouter = require('./backend/routes/dashboard');
const artistRouter = require('./backend/routes/artist');
const songsRouter = require('./backend/routes/songs');
const favouritesRouter = require('./backend/routes/favourites');
const recommenderRouter = require('./backend/routes/recommender');

app.use('/datalake', datalakeRouter);
app.use('/dashboard', dashboardRouter);
app.use('/users', usersRouter);
app.use('/artist', artistRouter);
app.use('/songs', songsRouter)
app.use('/favourites', favouritesRouter);
app.use('/recommendation', recommenderRouter);

// Endpoint to check if app is deployed
app.get('', (req, res) =>{
    res.send("hello")
});

const popfeed = functions
    .runWith({memory: "2GB", timeoutSeconds: 120})
    .https
    .onRequest(app);

// app.listen(port, () => {
//     console.log(`Server is running on port: ${port}`);
// });

// Firebase App deploy
// exports.popfeed = functions.https.onRequest(app);

module.exports = {
    popfeed
};