import React from 'react';
import axios from 'axios';
import './design.css'
import { get_JWT } from '../components/API/jwt';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Userinput = (props) => {

    const addArtist = async (event) => {
        // event.preventDefault();

        try {
            const jwt = get_JWT();
            // delete
            // const res = await axios.post('https://us-central1-popfeed-268519.cloudfunctions.net/popfeed/artist/search?q=', {artist: props.artist}) // this gives a promise back
            const res = await axios.post('https://us-central1-popfeed-web-app.cloudfunctions.net/popfeed/users/removeFromFollowingList', {id: jwt, artist: props.artist}) // this gives a promise back
            console.log(res.data)
            props.onDelete();
            toast(props.artist + "has been Added to Artists", {
                position: toast.POSITION.TOP_CENTER
            })
        }  catch (e) {
            console.log(e);
        }
    }

    const addFavourites = async (event) => {
        // event.preventDefault();

        try {
            const jwt = get_JWT();
            // delete
            // const res = await axios.post('https://us-central1-popfeed-268519.cloudfunctions.net/popfeed/artist/search?q=', {artist: props.artist}) // this gives a promise back
            const res = await axios.post('https://us-central1-popfeed-web-app.cloudfunctions.net/popfeed/users/removeFromFollowingList', {id: jwt, artist: props.artist}) // this gives a promise back
            console.log(res.data)
            props.onDelete();
            toast(props.artist + "has been Added to Favourites", {
                position: toast.POSITION.TOP_CENTER
            })
        }  catch (e) {
            console.log(e);
        }
    }

    return (  
        <div className="gridBox">
            <ToastContainer />
            <div className="sidestatValue">Artist: {props.artist}</div>

           <div className="sideStatTitle">Popular Song: {props.song}</div>

            <div className="sideStatTitle">Date: {props.date}</div>

            <div className="addButton margin_bottom" type="submit" onClick={addArtist}>
                Add Artist
            </div>

            <div className="addButton" type="submit" aria-label="add favourites button" onClick={addFavourites}>
                Favourite
            </div>

        </div>
    );
}


export default Userinput;
