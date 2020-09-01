
import React, { Component } from 'react';
import { Column } from 'simple-flexbox';

import '../App.css';
import './design.css'
import Logo from '../images/Logo.png'
import { Row } from 'simple-flexbox';
import MenuItemComponent from './MenuItemComponent';


class Sidebar extends Component {
  render() {
    return (
        <Column className='sidebar_container'>
        
          <Row className="logoCon" horizontal="center" vertical="center">
            <img className="Logo" src={Logo} alt="this is the logo, its just a capital P"></img>
            <span className="logoTitle">Sidebar</span>
          </Row>
        
          <Column className="menuItemList">
          <MenuItemComponent
                  title="Overview" icon={Logo}
              />

          </Column>


        </Column>
    );
  }
}

export default Sidebar;





{/* <img 
style={{
  backgroundImage: "url(" + Logo + ")"
}} className="Logo">
</img> */}



import React, { Component } from 'react';
import '../App.css';
import './design.css'
import Logo from '../images/Logo.png'
class Sidebar extends Component {

  render() {
    return (
        <div className='sidebar_container'>
          <div className="logoCon" horizontal="center" vertical="center">
              <button 
              style={{
                backgroundImage: "url(" + Logo + ")"
              }} className="Logo">
              </button>
             <span className="logoTitle">Sidebar</span>
          </div>

          


        </div>
    );
  }
}

export default Sidebar;








import React, { Component } from 'react';
import '../App.css';
import './design.css'
import Logo from '../images/Logo.png'
import { bool, func, string } from 'prop-types';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
class Sidebar extends Component {

  render() {
    return (
        <div className='sidebar_container'>
          <Row className="logoCon" horizontal="center" vertical="center">
              <button 
              style={{
                backgroundImage: "url(" + Logo + ")"
              }} className="Logo">
              </button>
             <span className="logoTitle">Sidebar</span>
          </Row>

          {/* <Row className={css(styles.container, active && styles.activeContainer)} vertical="center">
              {active && <div className={css(styles.activeBar)}></div>}
             <Icon fill={active && "#DDE2FF"} opacity={!active && "0.4"} />
             <span className={css(styles.title, active && styles.activeTitle)}>{title}</span>
          </Row> */}


        </div>
    );
  }
}

export default Sidebar;



//----------------------------------------------------------------------------------



import React from 'react';
import { string } from 'prop-types';
import { Row } from 'simple-flexbox';
import './design.css'
// import { StyleSheet, css } from 'aphrodite';


function MenuItemComponent(props) {
    const { title } = props;
    return (
        <Row className="itemContainer" vertical="center">
            {/* {active && <div className="activeBar"></div>} */}
            <span className="itemTitle">{title}</span>
        </Row>
    );
}

MenuItemComponent.propTypes = {
    title: string
};

export default MenuItemComponent;


//------------------------------------------------------------------------------


import React from 'react';
import { bool, func, string } from 'prop-types';
import { Row } from 'simple-flexbox';
import './design.css'
// import { StyleSheet, css } from 'aphrodite';


function MenuItemComponent(props) {
    const { title } = props;
    return (
        <Row className="itemContainer" vertical="center">
            {/* <div className="activeBar"></div> */}
            <span className="itemTitle">{title}</span>
        </Row>
    );
}

MenuItemComponent.propTypes = {
    active: bool,
    title: string
};

export default MenuItemComponent;




//---------------------------------------------------------------------------------------------------------------




import React, { Component } from 'react';
import NavbarPage from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Column } from 'simple-flexbox';
import { Row } from 'simple-flexbox';

class Index extends Component {

  render() {
    return (
        <Row className="mainContainer">
            <Sidebar />
            <Column flexGrow={1} className="mainBlock">
                <NavbarPage />
                <div className="mainContent">
                    <span>

                    The product being developed is best described as social media aggregator and song recommender. It will allow users to capture activities from a range of music artists such as promotions, concerts, new releases and social media updates which will then be displayed on a scrollable feed which is updated regularly. The term “aggregator” is used to label websites or programs which collect related data or items, the content of which to be displayed or linked.
                    
                    <br/>
                    <br/>

                    The application is being developed to provide the user with a better platform to keep updated with their favourite artist. There will be a search bar where the user can search specific artists to add to their current “favourite list”. Here, the user can also search for public playlists created by other users of the website to discover songs and artists.

                    <br />
                    <br/>

                    The dashboard feed will be populated by the latest activities from the members in the user’s favourite list. Coming from different social media platforms of the artist such as Twitter tweets, Facebook posts and images from Instagram.

                    <br />
                    <br/>

                    The song recommender will work based on the artists which the user have added into their favourite list as well as the songs in playlists they have created. It will look at similarities between the artist’s genres and their song types and will provide new songs which closely match the variables.



                    </span>
                </div>
            </Column>
        </Row>
    );
  }
}

export default Index;



// import React, { Component } from 'react';
// // import logo from '../images/logo.jpg';
// // import search_icon from '../images/search_icon.png';
// import '../App.css';
// import './design.css'
// class Navbar extends Component {
//   render() {
//     return (

//       <div className="navcontainer">
        
//           <nav className="menu">
            
          
//         </nav>
//       </div>
//     );
//   }
// }

// export default Navbar;


import React from 'react';
import { string } from 'prop-types';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import IconSearch from '../images/search';
import IconBellNew from '../images/bell';

const styles = StyleSheet.create({
    avatar: {
        height: 35,
        width: 35,
        borderRadius: 50,
        marginLeft: 14,
        border: '1px solid #DFE0EB',
    },
    container: {
        height: 40
    },
    cursorPointer: {
        cursor: 'pointer'
    },
    name: {
        fontFamily: 'Muli',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 14,
        lineHeight: '20px',
        textAlign: 'right',
        letterSpacing: 0.2
    },
    separator: {
        borderLeft: '1px solid #DFE0EB',
        marginLeft: 32,
        marginRight: 32,
        height: 32,
        width: 2
    },
    title: {
        fontFamily: 'Muli',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 24,
        lineHeight: '30px',
        letterSpacing: 0.3
    }
});

function HeaderComponent(props) {
    const { icon, title, ...otherProps } = props;
    return (
        <Row className={css(styles.container)} vertical="center" horizontal="space-between" {...otherProps}>
            <span className={css(styles.title)}>PopFeed</span>
            <Row vertical="center">
                <div className={css(styles.cursorPointer)}>
                    <IconSearch />
                </div>
                <div style={{ marginLeft: 25 }} className={css(styles.cursorPointer)}>
                    <IconBellNew />
                </div>
                <div className={css(styles.separator)}></div>
                <Row vertical="center">
                    <span className={css(styles.name, styles.cursorPointer)}>Draven Dale Calabia</span>
                    <img src="https://avatars3.githubusercontent.com/u/21162888?s=460&v=4" alt="avatar" className={css(styles.avatar, styles.cursorPointer)} />
                </Row>
            </Row>
        </Row>
    );
}

HeaderComponent.propTypes = {
    title: string
};

export default HeaderComponent;



// ------------------------------------------------------------------


import React, { Component } from 'react';
import NavbarPage from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../App.css';
import { Column } from 'simple-flexbox';
import { Row } from 'simple-flexbox';
import { Link } from 'react-router-dom';

// class Login extends Component {

//   render() {
//     return (
//         <Row className="mainContainer">
//           <Sidebar />
//             <Column flexGrow={1} className="mainBlock">
//                 <NavbarPage />
//                 <div className="mainContent">
//                     THe login page
//                 </div>
//             </Column>
//         </Row>
//     );
//   }
// }

// export default Login;






class Register extends Component {


  render() {
    return (
      <div className="loginContainer">
        
        {/* <div className="loginButton loginController">
            Use Free
        </div> */}

        <br/>

        <div className="loginBoxController">

          {/* <div className="loginController">
            Login
          </div>

          <div className="loginController">
            Login
          </div> */}
          

        <Link className="loginController" to="/login">
            Login
        </Link>

        <Link className="loginController" to="/dashboard">
            Use Free
        </Link>

        </div>

        <div className="loginBoxContainer">

         <RegisterBox />

        </div>
         
      </div>
    )
  }
}


class RegisterBox extends Component {

  constructor(props) {
    super(props);
    this.state = { };

  }

  submitRegister(e){
  
  }

  render() {
    return(
      <div className="loginInnerContainer">
        <div className="header">
          Register
        </div>
        <div className="loginBox">

          <div className="loginInputGroup">
            <label htmlFor="username">Email</label>
            <input type="text" name="Email" className="loginInput" placeholder="Email"/>
          </div>

          <div className="loginInputGroup">
            <label htmlFor="password">Password </label>
            <input type="password" name="password" className="loginInput" placeholder="Password"/>
          </div>

          <button type="button" className="loginButton" onClick={this.submitRegister.bind(this) } >Register</button>

        </div>
      </div>
    )
  }

}


export default Register;


// -------------------------------------------------------------



import React, { Component } from 'react';
import NavbarPage from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../App.css';
import { Column } from 'simple-flexbox';
import { Row } from 'simple-flexbox';
import { Link } from 'react-router-dom';



class Login extends Component {

  render() {
    return (
      <div className="loginContainer">
 
        <div className="loginBoxController">

        <Link className="loginController" to="/">
            Register
        </Link>

        <Link className="loginController" to="/dashboard">
            Use Free
        </Link>

        </div>

        <div className="loginBoxContainer">

          <LoginBox />

        </div>
         
      </div>
    )
  }
}


class LoginBox extends Component {

  constructor(props) {
    super(props);
    this.state = { };

  }

  submitLogin(e){
  
  }

  render() {
    return(
      <div className="loginInnerContainer">

        <div className="header">
          Login
        </div>

        <div className="loginBox">

          <div className="loginInputGroup">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" className="loginInput" placeholder="Username"/>
          </div>

          <div className="loginInputGroup">
            <label htmlFor="password">Password </label>
            <input type="password" name="password" className="loginInput" placeholder="Password"/>
          </div>

          <button type="button" className="loginButton" onClick={this.submitLogin.bind(this) } >Login</button>

        </div>
      </div>
    )
  }
}

export default Login;


// -------------------------------------------------------------


import React, { Component } from 'react';
import NavbarPage from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Column } from 'simple-flexbox';
import { Row } from 'simple-flexbox';

class dashboard extends Component {


  render() {

    return (
        <Row className="mainContainer">
            <Sidebar />
            <Column flexGrow={1} className="mainBlock">
                <NavbarPage />
                <div className="mainContent">
                    this is the main NavbarPage
                    <span>

                    The product being developed is best described as social media aggregator and song recommender. It will allow users to capture activities from a range of music artists such as promotions, concerts, new releases and social media updates which will then be displayed on a scrollable feed which is updated regularly. The term “aggregator” is used to label websites or programs which collect related data or items, the content of which to be displayed or linked.
                    
                    <br/>
                    <br/>

                    The application is being developed to provide the user with a better platform to keep updated with their favourite artist. There will be a search bar where the user can search specific artists to add to their current “favourite list”. Here, the user can also search for public playlists created by other users of the website to discover songs and artists.

                    <br />
                    <br/>

                    The dashboard feed will be populated by the latest activities from the members in the user’s favourite list. Coming from different social media platforms of the artist such as Twitter tweets, Facebook posts and images from Instagram.

                    <br />
                    <br/>

                    The song recommender will work based on the artists which the user have added into their favourite list as well as the songs in playlists they have created. It will look at similarities between the artist’s genres and their song types and will provide new songs which closely match the variables.



                    </span>
                </div>
            </Column>
        </Row>
    );
  }
}

export default dashboard;


// ------------------------------------------------------


import React, { Component } from 'react';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,  Switch, Route} from 'react-router-dom';
import Login from './pages/login';
import Profile from './pages/profile';
import Index from './pages/index';
import Dashboard from './pages/dashboard';



class App extends Component {

  // state = { selectedItem: 'Tickets' };
    componentDidMount() {
        window.addEventListener('resize', this.resize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    resize = () => this.forceUpdate();
  
  render() {
    // const { selectedItem } = this.state;

    
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Index}>
          </Route>
          <Route path="/login" component={Login}>
          </Route>
          <Route path="/profile" component={Profile}>
          </Route>
          <Route path="/dashboard" component={Dashboard}>
          </Route>

          {/* <Route path="/profile/:username" component={Profile}>
          </Route> */}
        </Switch>
      </Router>
    );
  }
}

export default App;


// -------------------------------------------------------------------

// import React, { Component } from 'react';
// // import logo from '../images/logo.jpg';
// // import search_icon from '../images/search_icon.png';
// import '../App.css';
// import './design.css'
// class Navbar extends Component {
//   render() {
//     return (

//       <div className="navcontainer">
        
//           <nav className="menu">
            
          
//         </nav>
//       </div>
//     );
//   }
// }

// export default Navbar;


import React from 'react';
import { string } from 'prop-types';
import { Row } from 'simple-flexbox';
import IconSearch from '../images/search';
import IconBellNew from '../images/bell';
import './design.css'


function HeaderComponent(props) {
    const { icon, title, ...otherProps } = props;
    return (
        <Row className="navContainer" vertical="center" horizontal="space-between" {...otherProps}>
            <span className="navTitle">PopFeed</span>
            <Row vertical="center">
                <form className="navBox" method="POST">
                    <input className="navSearchInput" placeholder="Type and hit enter"/>
                </form>
                <div className="navCursorPointer">
                    <IconSearch />
                </div>
                <div className="navCursorPointer bellIcon">
                    <IconBellNew />
                </div>
                <div className="navSeparator"></div>
                <Row vertical="center">
                    <span className="navName navCursorPointer">Draven Dale Calabia</span>
                    <img src="https://avatars3.githubusercontent.com/u/21162888?s=460&v=4" alt="avatar" className="navAvatar navCursorPointer" />
                </Row>
            </Row>
        </Row>
    );
}

HeaderComponent.propTypes = {
    title: string
};

export default HeaderComponent;



// -------------------------------------------------------------------------------------------------

// dashboard bookmark w/marco

import React, { Component } from 'react';
import NavbarPage from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Column } from 'simple-flexbox';
import { Row } from 'simple-flexbox';
import '../components/design.css';
import MainComponent from '../components/MainContent';
import axios from 'axios';
import Spinner from '../images/Spinner';

class dashboard extends Component {
    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    resize = () => this.forceUpdate();

    state = {
        artist_list: [],
        // heading: 'Top 10 Songs'
    };

    componentDidMount() {
        window.addEventListener('resize', this.resize);

        axios.get('http://localhost:5000/users/5e4b34eadd3c06183c4c1f35') // this gives a promise back
        .then(res => {
            // console.log(res.data)
            this.setState({artist_list: res.data.favourite})
        }) // using axios, you use res.data
        .catch(err => console.log(err));
    }

    render() {

    return (
        <Row className="mainContainer">
            <Sidebar />
            <Column flexGrow={1} className="mainBlock">
                <NavbarPage />
                
                <div className="mainContent">
                    <span className="navTitle">Dashboard</span>
                    <br/><br/>

                    <MainComponent 
                    title=""
                    date="as of 25 May 2020, 09:41 PM"
                    content="The product being developed is best described as social media aggregator and song recommender. It will allow users to capture activities from a range of music artists such as promotions, concerts, new releases and social media updates which will then be displayed on a scrollable feed which is updated regularly. The term “aggregator” is used to label websites or programs which collect related data or items, the content of which to be displayed or linked."
                    concertPrice="£60"
                    albumName="Purpose"
                    location="Miami, Florida"
                    />

                    {/* <ReptileList/> */}

    
                    <div>
                        {artist_list.map(item => (
                        <MainComponent title={item}
                        date="as of 25 May 2020, 09:41 PM"
                        content="The product being developed is best described as social media aggregator and song recommender. It will allow users to capture activities from a range of music artists such as promotions, concerts, new releases and social media updates which will then be displayed on a scrollable feed which is updated regularly. The term “aggregator” is used to label websites or programs which collect related data or items, the content of which to be displayed or linked."
                        concertPrice="£60"
                        albumName="Purpose"
                        location="Miami, Florida"
                        />

                        ))}
                        {/* {console.log(artist_list)} */}
                    </div>
                    

                </div>
            </Column>
        </Row>
    );
  }
}


function ReptileList() {
    const names = ['alligator', 'snake', 'lizard'];
  
    return (
      <div>
        {names.map(item => (
            <MainComponent title={item}
            date="as of 25 May 2020, 09:41 PM"
            content="The product being developed is best described as social media aggregator and song recommender. It will allow users to capture activities from a range of music artists such as promotions, concerts, new releases and social media updates which will then be displayed on a scrollable feed which is updated regularly. The term “aggregator” is used to label websites or programs which collect related data or items, the content of which to be displayed or linked."
            concertPrice="£60"
            albumName="Purpose"
            location="Miami, Florida"
            />
        ))}
      </div>
    );
  }


export default dashboard;




// {test => {
//     // console.log(value);
//     const { reptiles } = test;
//     if(reptiles === undefined || reptiles.length === 0) {
//         return <Spinner />
//     } else {
//         return (
            // <div>
            //     {reptiles.map(item => (
            //         <MainComponent title={item}
            //         date="as of 25 May 2020, 09:41 PM"
            //         content="The product being developed is best described as social media aggregator and song recommender. It will allow users to capture activities from a range of music artists such as promotions, concerts, new releases and social media updates which will then be displayed on a scrollable feed which is updated regularly. The term “aggregator” is used to label websites or programs which collect related data or items, the content of which to be displayed or linked."
            //         concertPrice="£60"
            //         albumName="Purpose"
            //         location="Miami, Florida"
            //         />
            //     ))}
            //     {/* {console.log(artist_list)} */}
            // </div>

//             )
//         }
//     }}


// -===================================================================================================================
// this is the axios get explination.
        // axios.get('http://localhost:5000/users/5e4b34eadd3c06183c4c1f35') // this gives a promise back
        // .then(res => {
        //     console.log(res.data.favourites)
        //     this.setState({artist_list: res.data.favourites})
        // }) // using axios, you use res.data
        // .catch(err => console.log(err));


// -===================================================================================================================
// 


// -===================================================================================================================
// dashboard

        // const jwt = get_JWT();
        // await axios.get('https://us-central1-popfeed-268519.cloudfunctions.net/popfeed/dashboard/' + jwt) // this gives a promise back
        // .then(res => {
        //     console.log(res.data)
        //     this.setState({artist_list: res.data.favourites})
        // }) // using axios, you use res.data
        // .catch(err => console.log(err));


// -===================================================================================================================
// sidebar logo and span
    {/* <img className="Logo" src={Logo} alt="this is the logo, its just a capital P"></img> */}
                {/* <span >Sidebar</span> */}

// -===================================================================================================================
// dashboard

    // handleClickSearch = (item) => {
    //     this.props.history.push("/search?q=" + item)
    // }; onClick={this.handleClickSearch(item)}
    // redirectPage(item) {
    //     this.props.history.push("/search?q=" + item)
    // } onClick={this.redirectPage(item)}

                    {/* <br/><br/>
                    <h1>status: {this.props.loggedInStatus}</h1> */}


                    {/* {
                    this.state.artist_list.map(item => (
                    <MainComponent title={item}
                    date="as of 25 May 2020, 09:41 PM"
                    content="The product being developed is best described as social media aggregator and song recommender. It will allow users to capture activities from a range of music artists such as promotions, concerts, new releases and social media updates which will then be displayed on a scrollable feed which is updated regularly. The term “aggregator” is used to label websites or programs which collect related data or items, the content of which to be displayed or linked."
                    concertPrice="£60"
                    albumName="Purpose"
                    location="Miami, Florida"
                    />))
                    } */}

// =====================================================================================================
// search.js

{/* {
<MainComponent title="hello"
date="as of 25 May 2020, 09:41 PM"
content="The product being developed is best described as social media aggregator and song recommender. It will allow users to capture activities from a range of music artists such as promotions, concerts, new releases and social media updates which will then be displayed on a scrollable feed which is updated regularly. The term “aggregator” is used to label websites or programs which collect related data or items, the content of which to be displayed or linked."
concertPrice="£60"
albumName="Purpose"
location="Miami, Florida"
/>
} */}


{/* {this.state.test.map(item => (
    <MainComponent title={item}
    date="as of 25 May 2020, 09:41 PM"
    content="The product being developed is best described as social media aggregator and song recommender. It will allow users to capture activities from a range of music artists such as promotions, concerts, new releases and social media updates which will then be displayed on a scrollable feed which is updated regularly. The term “aggregator” is used to label websites or programs which collect related data or items, the content of which to be displayed or linked."
    concertPrice="£60"
    albumName="Purpose"
    location="Miami, Florida"
    />
))} */}


// {_id: "5e5c26dc91773c14c803be3e", artist_name: "taylor swift", latest_event: "Taylor Swift: Lover Fest West", latest_event_url: "https://www.ticketmaster.com/taylor-swift-lover-fe…wood-california-07-25-2020/event/0A00574B4DB05AFC", most_relevant_album: "Lover", …}
// _id: "5e5c26dc91773c14c803be3e"
// artist_name: "taylor swift"
// latest_event: "Taylor Swift: Lover Fest West"
// latest_event_url: "https://www.ticketmaster.com/taylor-swift-lover-fest-west-inglewood-california-07-25-2020/event/0A00574B4DB05AFC"
// most_relevant_album: "Lover"
// most_relevant_album_release_date: "2019-08-23"
// total_tracks: "18"
// currency: "USD"
// min: "44.5"
// max: "514.5"
// twitter_screen_name: "taylorswift13"
// personal_url: "https://t.co/paqigoU9Fg"
// twitter_id: "17919972"
// location: ""
// twitter_url: "https://twitter.com/taylorswift13"
// latest_status_id: "1233213342002618368"
// twitter_embed: {url: "https://twitter.com/taylorswift13/status/1233213342002618368", author_name: "Taylor Swift", author_url: "https://twitter.com/taylorswift13", html: "<blockquote class="twitter-tweet"><p lang="en" dir…witter.com/widgets.js" charset="utf-8"></script>↵", width: 550, …}
// createdAt: "2020-03-01T21:19:24.091Z"
// updatedAt: "2020-03-01T21:19:24.091Z"
// __v: 0
// __proto__: Object

// ======================================================================================================
// login.js


// class LoginBox extends Component {

//   constructor(props) {
//     super(props);
//     // this.state = { };

//   }

//   // submitRegister(e){
  
//   // }

//   render() {
//     return(
//       <div className="loginInnerContainer">
//         <div className="header">
//           Login
//         </div>
//         <div className="loginBox">
//           <Log/>
//         </div>
//       </div>
//     )
//   }
// }

// ========================================================================================

// notifications.js

{/* <MainComponent title="hello"
date="as of 25 May 2020, 09:41 PM"
content="The product being developed is best described as social media aggregator and song recommender. It will allow users to capture activities from a range of music artists such as promotions, concerts, new releases and social media updates which will then be displayed on a scrollable feed which is updated regularly. The term “aggregator” is used to label websites or programs which collect related data or items, the content of which to be displayed or linked."
concertPrice="£60"
albumName="Purpose"
location="Miami, Florida"
/> */}

// ================================================================================================
// recommendations.js

{/* {
    this.state.loading ? <div>Loading...</div> : this.state.recommend_list.map(item)
}

{
    !!items.length && items
} */}

// ===============================================================================================


                    {/* {
                        (this.state.artist_list.result === null) 
                        ? <div>Artist Not Found</div> 
                        : (
                            <div> 
                                {this.state.test.map(item => (
                                    <MainComponent title={item} 
                                    date="as of 25 May 2020, 09:41 PM"
                                    content="The product being developed is best described as social media aggregator and song recommender. It will allow users to capture activities from a range of music artists such as promotions, concerts, new releases and social media updates which will then be displayed on a scrollable feed which is updated regularly. The term “aggregator” is used to label websites or programs which collect related data or items, the content of which to be displayed or linked."
                                    concertPrice="£60"
                                    albumName="Purpose"
                                    location="Miami, Florida"
                                    youtubeID=""
                                    artistSearch={item}
                                    />
                                ))}


                            </div>
                        )
                    } */}

                        {/* <MainComponent title="ariana grande" 
                        date="2020-03-04T17:14:24.900Z"
                        content="Music has always been Ariana Grande's first love. In fact, long before millions of fans fell in love with the singer and actress as Cat Valentine on the hit ..."
                        concertPrice="n/a n/a - n/a n/a"
                        albumName="thank u, next"
                        concert="No Events Found For ariana grande"
                        tweetID=""
                        youtubeID="9CA11SXv79Y"
                        youtubeTitle=""
                        youtubeChannel=""
                        artistSearch="ariana grande"
                        />

                          <MainComponent title="bruno mars" 
                          date="2020-03-03T11:02:17.079Z"
                          content="Peter Gene Hernandez, known professionally as Bruno Mars, is an American singer, songwriter, record producer, multi-instrumentalist, and dancer. He is known ..."
                          concertPrice="91.28 USD - 505 USD"
                          albumName="Doo-Wops & Hooligans"
                          concert="Bruno Mars"
                          tweetID="1232755639522189312"
                          youtubeID=""
                          youtubeTitle=""
                          youtubeChannel=""
                          artistSearch="bruno mars"
                          />   */}
// ============================================================================
// search page

const query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
console.log(query.q)
console.log("?q="+ (query.q).replace(" ", "%20"))
console.log(this.props.location.search)
console.log((this.props.location.search).replace("%20", " "))
if(this.props.location.search !== ("?q="+ (query.q).replace(" ", "%20"))) {
    window.location.reload();
}
