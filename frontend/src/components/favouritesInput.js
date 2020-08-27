import React from 'react';
import './design.css'
import axios from 'axios';
import { get_JWT } from '../components/API/jwt';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Userinput = (props) => {

    const deleteArtist = async () => {
        // event.preventDefault();

        try {
            const jwt = get_JWT();
            // delete
            // const res = await axios.post('https://us-central1-popfeed-268519.cloudfunctions.net/popfeed/artist/search?q=', {artist: props.artist}) // this gives a promise back
            const res = await axios.post('http://localhost:5000/users/removeFromFavouritesList', {
                id: jwt,
                entry: props.head
            }) // this gives a promise back
            console.log(res.data)
            props.onDelete();
            toast(props.head + " has been deleted");
        }  catch (e) {
            console.log(e);
        }
        console.log(props.artist)
    }

    return (  
        <div className="gridBox">
            <ToastContainer />
            {
                props.fav_id === "a"
                &&
                <div>
                    <div className="sidestatValue">Artist: {props.head}</div>
                    <div className="sideStatTitle flex">Song: {props.sub}</div>
                    <div className="sideStatTitle">Date: {props.date.slice(0,10)}</div>

                    <div className="addButton" type="submit" aria-label="delete artist button" onClick={deleteArtist}>
                        Delete
                    </div>
                </div>
            }

            {
                props.fav_id === "s"
                &&
                <div>
                    <div className="sidestatValue">Song: {props.head}</div>
                    <div className="sideStatTitle flex">Artist: {props.sub}</div>
                    <div className="sideStatTitle flex">Album: {props.album}</div>
                    <div className="sideStatTitle">Track: {props.track}</div>

                    <div className="addButton" type="submit" aria-label="delete song button" onClick={deleteArtist}>
                        Delete
                    </div>
                    

                </div>
            }
        </div>
    );
}



export default Userinput;

// (props.link === null) &&
// <a href={this.link} rel="noopener noreferrer" target="_blank" className="addButton alignCenter"> Go To Artist Youtube Channel </a>