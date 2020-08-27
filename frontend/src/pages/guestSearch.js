import React, { Component } from 'react';
import '../App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Column } from 'simple-flexbox';
import { Row } from 'simple-flexbox';
import MainComponent from '../components/MainContent';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import IconSearch from '../images/search';
// import IconBellNew from '../images/bell';
import qs from 'qs';
import Burger from '../images/burgerMenu';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
// import { get_JWT } from '../components/API/jwt';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const styles = StyleSheet.create({
    containerMobile: {
        transition: 'left 0.5s, right 0.5s',
        position: 'absolute',
        width: 255,
        height: 'calc(100% - 32px)',
        zIndex: 901
    },
    mainContainerMobile: {
      position: 'absolute',
      top: 0,
      left: 0
    },
    mainContainerExpanded: {
        width: '100%',
        minWidth: '100vh',
    },
    hide: {
        left: -255
    },
    show: {
        left: 0
    }
  });


class Search extends Component {
    // constructor(props) {
    //     super(props);
    // }


    state = {
        artist: [],
        expanded: false
    };

    onItemClicked = (item) => {
        this.setState({ expanded: false });
        return this.props.onChange(item);
    }

    isMobile = () => window.innerWidth <= 768;

    toggleMenu = () => this.setState(prevState => ({ expanded: !prevState.expanded }));

    renderBurger = () => {
        return <div onClick={this.toggleMenu} className="burgerIcon">
            <Burger />
        </div>
    }
    resize = () => this.forceUpdate();

    notify = () => toast("Create an account to use this feature", {
        position: toast.POSITION.TOP_CENTER
    });

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

    handleClickSearch = () => {
        if(this.refs.searchInput.value === "?q=") {
            toast("Enter an artist");
            // console.log("not read")
        } else {
            this.props.history.push("/guestSearch?q=" + this.refs.searchInput.value);
        }
    }

    async componentDidMount() {
        window.addEventListener('resize', this.resize);
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


  render() {
    const query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    // console.log(query);
    const { expanded } = this.state;
    const isMobile = this.isMobile();
    
    
    return (
        <Row className="mainContainer">
            {/* <Sidebar /> */}
            <ToastContainer />

                    <div style={{ position: 'relative' }}>

                    <Row className="sidebar_mainContainer" breakpoints={{ 768: css(styles.mainContainerMobile, expanded && styles.mainContainerExpanded) }}>
                        {(isMobile && !expanded) && this.renderBurger()}

                        <Column className='sidebar_container' breakpoints={{ 768: css(styles.containerMobile, expanded ? styles.show : styles.hide) }}>
                        
                        <Link className="logoCon" aria-label="Not usable, make an account" horizontal="center" vertical="center" to="/">
                            {/* <img className="Logo" src={Logo} alt="this is the logo, its just a capital P"></img> */}
                            {/* <span >Sidebar</span> */}
                            <p className="logoTitle">Sign up!</p>
                        </Link>
                        
                        <Column className="menuItemList">
                            <div className="guestItemContainer" aria-label="Not usable, make an account" onClick={this.notify}>Profile</div>
                            <div className="guestItemContainer" aria-label="Not usable, make an account" onClick={this.notify}>Artists</div>
                            <div className="guestItemContainer" aria-label="Not usable, make an account" onClick={this.notify}>Songs</div>
                            <div className="guestItemContainer" aria-label="Not usable, make an account" onClick={this.notify}>Favourites</div>
                            <div className="guestItemContainer" aria-label="Not usable, make an account" onClick={this.notify}>Recommendations</div>
                            {/* <div className="guestItemContainer" onClick={this.notify}>Notifications</div>          */}
                            <div className="sidebar_seperator"></div>
                            <div className="guestItemContainer" onClick={this.notify}>Sign out</div>
                        </Column>


                        </Column>

                        {isMobile && expanded && <div className="sidebar_outsideLayer" onClick={this.toggleMenu}></div>}
                    </Row>
                    </div>



            <Column flexGrow={1} className="mainBlock">

                    <Row className="navContainer" vertical="center" horizontal="space-between" >
                        <span className="navTitle">PopFeed</span>
                        <Row vertical="center">
                            <form className="navBox" onSubmit={(e) => {
                                e.preventDefault();
                                this.props.history.push("/guestSearch?q=" + this.refs.searchInput.value)
                            }}>
                                <input id="input" ref="searchInput" className="navSearchInput" placeholder="Type and hit enter"/>
                            </form>

                            <div id="searchBtn" className="navIconStyles" onClick={this.handleClickSearch}>
                                <IconSearch />
                            </div>

                            <div className="navSeparator"></div>
                        </Row>
                    </Row>

                <div className="mainContent">
                <span className="navTitle">Guest</span>
                <div className="multiTitle">Search: {query.q}</div> 
                            {
                                (this.state.artist.result === null || !this.state.artist.artist_name)
                                ? <div className="multiTitle">Artist Not Found</div> 
                                : (<div> 

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