import React, { Component } from 'react';
import '../App.css';
import { Column } from 'simple-flexbox';
import { Row } from 'simple-flexbox';
import '../components/design.css';
import MainComponent from '../components/MainContent';
import axios from 'axios';
// import Spinner from '../images/Spinner';
// import { get_JWT } from '../components/API/jwt';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
// import { withRouter } from 'react-router-dom';
// import Logo from '../images/Logo.png'
import Burger from '../images/burgerMenu';
import IconSearch from '../images/search';
// import IconBellNew from '../images/bell';
import qs from 'qs';
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
  



class dashboard extends Component {
    // constructor(props) {
    //     super(props);
    // }

    state = { expanded: false };

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

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    resize = () => this.forceUpdate();

    notify = () => toast("Create an account to use this feature", {
        position: toast.POSITION.TOP_CENTER
    });

    state = {
        artist_list: [],
        // heading: 'Top 10 Songs'
    };
    // artist_list
    async componentDidMount() {
        window.addEventListener('resize', this.resize);
        const jwt = "5e5fb9ede3431900026874bb"
        // await axios.get('https://us-central1-popfeed-268519.cloudfunctions.net/popfeed/users/' + jwt) // this gives a promise back
         await axios.get('https://us-central1-popfeed-web-app.cloudfunctions.net/popfeed/dashboard?id=' + jwt) // this gives a promise back
        .then(res => {
            console.log(res.data)
            this.setState({artist_list: res.data})
        }) // using axios, you use res.data
        .catch(err => console.log(err));
    }
    
    handleClickSearch = () => {
        if(this.refs.searchInput.value === "?q=") {
            toast("Enter an artist");
            // console.log("not read")
        } else {
            this.props.history.push("/guestSearch?q=" + this.refs.searchInput.value);
        }

    }

    render() {
        const query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        console.log(query);
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
                        <div className="guestItemContainer" aria-label="Not usable, make an account" onClick={this.notify}>Sign out</div>
                    </Column>


                    </Column>

                    {isMobile && expanded && <div className="sidebar_outsideLayer" onClick={this.toggleMenu}></div>}
                </Row>
                </div>



                <Column flexGrow={1} className="mainBlock">
                    {/* <NavbarPage /> */}

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
                            {/* <div className="navIconStyles bellIcon">
                                <IconBellNew />
                            </div> */}
                            <div className="navSeparator"></div>
                        </Row>
                    </Row>




                    
                    <div className="mainContent">
                        <span className="navTitle">Dashboard</span>
                        <br/><br/>
                        {/* <h1>status: {this.props.loggedInStatus}</h1> */}


                        {
                        (this.state.artist_list.length === 0) 
                        ? <div className="multiTitle">Artist Not Found</div> 
                        : (
                            <div> 
                                {this.state.artist_list.map(item => (
                                    <div>
                                    <MainComponent title={item.artist_name}
                                    date={item.createdAt}
                                    content={item.artist_description}                                   
                                    concertPrice={item.min + " " + item.currency + " - " + item.max + " " + item.currency}
                                    albumName={item.most_relevant_album}
                                    concert={item.latest_event}
                                    youtubeID={item.youtube_upload_id}
                                    youtubeTitle={item.youtube_upload_title}
                                    youtubeChannel=""
                                    // artistSearch={item.artist_name}
                                    />    
                                    </div>
                                ))}


                            </div>
                            )
                        }
                    </div>
                </Column>
            </Row>
        );
    }
}

export default dashboard;


