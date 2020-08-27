import React, { Component } from 'react';
import NavbarPage from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Column } from 'simple-flexbox';
import { Row } from 'simple-flexbox';
import MainComponent from '../components/MainContent';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { get_JWT } from '../components/API/jwt';
// import RNUrlPreview from 'react-native-url-preview';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Search extends Component {
    constructor(props) {
        super(props)
    
    // This binding is necessary to make `this` work in the callback
    this.addArtist = this.addArtist.bind(this);
    this.addFavourites = this.addFavourites.bind(this);
    }

    state = {
        artist: [],
        loading: false,
        page: false,
        test: ["Bruno Mars", "Taylor Swift", "Kesha"]
    };


    async addArtist() {
        // const query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        const jwt = get_JWT();
        try {
            // const res = await axios.post('https://us-central1-popfeed-268519.cloudfunctions.net/popfeed/users/addToFollowingList', {artist: this.state.artist.artist_name, id: jwt}) // this gives a promise back
            const res = await axios.post('http://localhost:5000/users/addToFollowingList', {artist: this.state.artist.artist_name, id: jwt}) // this gives a promise back
            console.log(res.data)
            console.log(this.state.artist.artist_name, )
            if(res.data.result === null) {
                this.setState({page: true})
            }
            toast("Artist Added", {
                position: toast.POSITION.TOP_CENTER
              })
            console.log("works")
        }  catch (e) {
            console.log(e);
        }     
    }

    async addFavourites() {
        // const query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        const jwt = get_JWT();
        try {
            const res = await axios.post('http://localhost:5000/users/addToFavouritesList', {
                // artist: query.q.toLowerCase(),
                entry: {head: this.state.artist.artist_name, sub: this.state.artist.most_relevant_album, date: this.state.artist.createdAt, fav_id: "a"},
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

    async componentDidUpdate(prevProps) {
        if (prevProps.location.search !== this.props.location.search) {
            const query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });    
            try {
                this.setState({loading: true});
                // const res = await axios.get('https://us-central1-popfeed-268519.cloudfunctions.net/popfeed/artist/search?q='+ query.q) // this gives a promise back
                const res = await axios.get('http://localhost:5000/artist/search?q='+ query.q) // this gives a promise back
                this.setState({artist: res.data, loading: false})
                console.log(res.data)
    
            }  catch (e) {
                console.log(e);
            }
        }
        
       }

    async componentDidMount() {
        window.addEventListener('resize', this.resize);

        const query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        console.log(query.q)
        console.log("?q="+ (query.q).replace(" ", "%20"))
        console.log(this.props.location.search)
        console.log((this.props.location.search).replace("%20", " "))
        // if(this.props.location.search !== ("?q="+ (query.q).replace(" ", "%20"))) {
        //     window.location.reload();
        // }

        try {
            this.setState({loading: true});
            // const res = await axios.get('https://us-central1-popfeed-268519.cloudfunctions.net/popfeed/artist/search?q='+ query.q) // this gives a promise back
            const res = await axios.get('http://localhost:5000/artist/search?q='+ query.q) // this gives a promise back
            this.setState({artist: res.data, loading: false})
            console.log(res.data)

        }  catch (e) {
            console.log(e);
        }
    
    }

  render() {
    const query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    // console.log(query);
    
    
    return (
        <Row className="mainContainer">
            <Sidebar />
            <ToastContainer />
            <Column flexGrow={1} className="mainBlock">
                <NavbarPage />
                <div className="mainContent">
                    <span className="multiTitle">Search: {query.q}</span>
                            {
                                (this.state.artist.result === null || !this.state.artist.artist_name) 
                                ? <div className="multiTitle">Artist Not Found</div> 
                                : (<div> 
                                        <div className="alignCenter">
                                            <div className="searchButton" id="addArtistBtn" aria-label="Add artist button" onClick={this.addArtist}>Add Artist </div>
                                            <div className="searchButton searchButtonWidth"aria-label="Add favourites Button" id="addFavBtn" onClick={this.addFavourites}>Favourite </div>

                                        </div>

                                    <MainComponent title={this.state.artist.artist_name}
                                    date={this.state.artist.createdAt}
                                    content={this.state.artist.artist_description}                                   
                                    concertPrice={this.state.artist.min + " " + this.state.artist.currency + " - " + this.state.artist.max + " " + this.state.artist.currency}
                                    albumName={this.state.artist.most_relevant_album}
                                    concert={this.state.artist.latest_event}
                                    youtubeID={this.state.artist.youtube_upload_id}
                                    youtubeTitle={this.state.artist.youtube_upload_title}
                                    youtubeChannel={this.state.artist.youtube_id}
                                    artistSearch=""
                                    />    
                                    
                                    <div className="alignCenter">
                                    <TwitterTimelineEmbed className="alignCenter"
                                    sourceType="profile"
                                    screenName={this.state.artist.twitter_screen_name}
                                    options={{height: 500, width: 1300}}
                                    />

                                    </div>
                                </div>)
                            }
                    
                </div>
            </Column>
        </Row>
    );
  }
}

export default withRouter(Search);