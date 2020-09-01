import React from 'react';
import './design.css'
import axios from 'axios';
import { get_JWT } from '../components/API/jwt';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Userinput = (props) => {

    const addFavourites = async () => {
        // event.preventDefault();

        const jwt = get_JWT();
        try {
            const res = await axios.post('https://us-central1-popfeed-web-app.cloudfunctions.net/popfeed/users/addToFavouritesList', {
                // artist: query.q.toLowerCase(),
                entry: {head: props.song, sub: props.artist, album: props.album, track: props.track, link: props.link, fav_id: "s"},
                id: jwt
            }) // this gives a promise back
            console.log(res.data)
            toast("Favourites Added", {
                position: toast.POSITION.TOP_CENTER
            })
            console.log("works")
        }  catch (e) {
            console.log(e);
        }  
    }

    return (  
        <div className="gridBox">
            <ToastContainer />
            <div className="sidestatValue">Song: {props.song}</div>

            <div className="sideStatTitle">Artist: {props.artist}</div>

            <div className="sideStatTitle">Album: {props.album}</div>

            <div className="sideStatTitle">track: {props.track}</div>

            <div className="addButton" type="submit" aria-label="add favourites button" onClick={addFavourites}>
                Favourite
            </div>

        </div>
    );
}


export default Userinput;