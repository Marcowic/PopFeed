import React, { Component } from 'react';
import '../App.css';
import './design.css'
class Sidebar extends Component {

  render() {
    return (
        <div className='sidebar_container'>
            
            <div className="side_list">
            <div className="box1" >
                <h4>box1</h4>
            </div>

            <div className="box2" >
            <h4>box1</h4>
            </div>

            <div className="box3" >
            <h4>box1</h4>
            </div>

            <div className="box4" >
            <h4>box1</h4>
            </div>

            <div className="box5" >
            <h4>box1</h4>
            </div>

            </div>
        </div>
    );
  }
}

export default Sidebar;


// ------------------------------------------------------------------


// import React, { Component } from 'react';

// class Navbar extends Component {
//   render() {
//     return (
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//         <a className="navbar-brand" href="#">Navbar</a>
//         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav mr-auto">
//             <li className="nav-item active">
//               <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#">Link</a>
//             </li>
//             <li className="nav-item dropdown">
//               <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                 Dropdown
//               </a>
//               <div className="dropdown-menu" aria-labelledby="navbarDropdown">
//                 <a className="dropdown-item" href="#">Action</a>
//                 <a className="dropdown-item" href="#">Another action</a>
//                 <div className="dropdown-divider"></div>
//                 <a className="dropdown-item" href="#">Something else here</a>
//               </div>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
//             </li>
//           </ul>
//           <form className="form-inline my-2 my-lg-0">
//             <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
//             <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
//           </form>
//         </div>
//       </nav>
//     );
//   }
// }

//export default Navbar;

import React, { Component } from 'react';
import logo from '../images/logo.jpg';
import search_icon from '../images/search_icon.png';
import '../App.css';
import './design.css'
class Navbar extends Component {
  render() {
    return (

      <div className="navcontainer">
        
          <nav className="menu">
            <button 
              style={{
                backgroundImage: "url(" + search_icon + ")"
              }} className="sidebar_button"></button>
            <h1 
            // style={{
            //   backgroundImage: "url(" + logo + ")"
            //   }} 
              className="logo">Popfeed</h1>

            <div className="right">
              <ul>
                  <li><a href="/">Profile</a></li>
                  <li><a href="/">Artists</a></li>
                  <li><a href="/">Songs</a></li>
                  <li><a href="/">likes</a></li>
              </ul>
            </div>

            <div className="bu">
              <button 
              style={{
                backgroundImage: "url(" + search_icon + ")"
              }} className="search_button"></button>

            </div>
              <form className="search_form" method="POST">
                <input className="search_input" placeholder="type and hit enter"/> 
              </form>
          
        </nav>
      </div>
    );
  }
}

export default Navbar;


// ---------------------------------------------------

//import React from 'react';
import React, { Component } from 'react'; // same thi
import NavbarPage from './components/Navbar';
import Sidebar from './components/Sidebar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//           Edit <code>src/App.js</code> and save to reload.
//function App() {  // same as
class App extends Component {
  render() {
    return (
      <div className="App">
        <NavbarPage />
        <Sidebar />
      </div>
    );
  }
}

export default App;




{/* <img 
style={{
  backgroundImage: "url(" + Logo + ")"
}} className="Logo">
</img> */}


//-------------------------------------------------------

import React from 'react';
import { bool, func, string } from 'prop-types';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
    activeBar: {
        height: 56,
        width: 3,
        backgroundColor: '#DDE2FF',
        position: 'absolute',
        left: 0
    },
    activeContainer: {
        backgroundColor: 'rgba(221,226,255, 0.08)'
    },
    activeTitle: {
        color: '#DDE2FF'
    },
    container: {
        height: 56,
        cursor: 'pointer',
        ':hover': {
            backgroundColor: 'rgba(221,226,255, 0.08)'
        },
        paddingLeft: 32,
        paddingRight: 32
    },
    title: {
        fontFamily: 'Muli',
        fontSize: 16,
        lineHeight: '20px',
        letterSpacing: '0.2px',
        color: '#A4A6B3',
        marginLeft: 24
    }
});

function MenuItemComponent(props) {
    const { active, title, ...otherProps } = props;
    return (
        <Row className={css(styles.container, active && styles.activeContainer)} vertical="center" {...otherProps}>
            {active && <div className={css(styles.activeBar)}></div>}
            <span className={css(styles.title, active && styles.activeTitle)}>{title}</span>
        </Row>
    );
}

MenuItemComponent.propTypes = {
    active: bool,
    title: string
};

export default MenuItemComponent;




// ----------------------------------------------------------------------------------

// ContentComponent

import React from 'react';
import { Column, Row } from 'simple-flexbox';
// import { StyleSheet, css } from 'aphrodite/no-important';
import Topboxs from './Topboxs';
import Maincontent from './MainContent';
import './design.css'


function ContentComponent() {
    return (
        <Column>
            <span className="navTitle">Dashboard</span>
            {/* <Row className="contentTopBoxContainer" wrap flexGrow={1} horizontal="space-between" breakpoints={{ 768: 'column' }}>
                <Row className="contentSingleBox" wrap flexGrow={1} horizontal="space-between" breakpoints={{ 384: 'column' }}>
                    <Topboxs className="contentSingleBoxContainer" title="marron 5" value="New Album" />
                    <Topboxs className="contentSingleBoxContainer" title="Ariana Grande" value="Power Tour" />
                </Row>
                <Row className="contentSingleBox" wrap flexGrow={1} horizontal="space-between" breakpoints={{ 384: 'column' }}>
                    <Topboxs className="contentSingleBoxContainer" title="Justin Bieber" value="Purpose" />
                    <Topboxs className="contentSingleBoxContainer" title="Ilya" value="Help" />
                </Row>
            </Row> */}
            <div className="contentMainContent">
                <Maincontent />
            </div>
        </Column>
    );
}

export default ContentComponent;

// ------------------------------------------------------------------------------------------------------------------------------------------


// import React, {Component} from 'react';
// import './design.css'

// class LoginForm extends Component {

//     constructor(props) {
//         super(props)

//         this.state = {
//             email: '',
//             password: '',
//         }
//     }

// 	changeHandler = e => {
// 		this.setState({ [e.target.name]: e.target.value })
// 	}

//     submitHandler = e => {
//         e.preventDefault() // this prevents page refresh
//         console.log(this.state)
//     }

//     render() {

//         const {email, password} = this.state

//         return (
//             <form onSubmit={this.submitHandler}>


//                 <div className="loginInputGroup">
//                 <label htmlFor="email">Email</label>
//                 <input type="text" name="email" className="loginInput" placeholder="Email" value={email} onChange={this.changeHandler}/>
//                 </div>
    
//                 <div className="loginInputGroup">
//                 <label htmlFor="password">Password</label>
//                 <input type="password" name="password" className="loginInput" placeholder="Password" value={password} onChange={this.changeHandler}/>
//                 </div>
    
//                 <button type="submit" className="loginButton" >Login</button>
    

//             </form>
//         )
//     }
// }


// export default LoginForm;

// ---------------------------------------------------------------------------------------
      // the login form

import React, {useState, Component} from 'react';
import './design.css'
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class LoginForm extends Component {

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // var error = false;

    state = {
        email = '',
        password = ''
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const url = 'https://us-central1-popfeed-268519.cloudfunctions.net/popfeed/users/login';
        // const { history } = this.props;

        // store.set('loggedin', true);
        // history.push('/dashboard')


        const body = {
          password: password,
          email: email
        }
        // () => this.setState({ error: true })
        axios.post(url, body)
        .then(res => {
            console.log(res); 
            localStorage.setItem('cool-jwt', res.data);
            props.history.push("/dashboard");

        })      
        .catch(err => console.log(err)) 


    }

    render() {
        return (
            <form onSubmit={handleSubmit}>
                <div className="loginInputGroup">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" className="loginInput" placeholder="Email" value={email} required onChange={event => setEmail(event.target.value)}/>
                </div>

                <div className="loginInputGroup">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" className="loginInput" placeholder="Password" value={password} required onChange={event => setPassword(event.target.value)}/>
                </div>

                <button type="submit" className="loginButton" >Login</button>
            </form>
        );
    }
}


export default LoginForm;




        // let data = {
        //     email: email,
        //     password: password
        // };

        // var request = new Request(url, {
        //   method: 'POST',
        //   body: data,
        //   headers: new Headers()

        // });

        // fetch(request)
        // .then((response) => {
        //   return response.json();
        // })

        // .catch((error) => {
        //   console.error('Error', error);

        // });



// ==================================================================================================
// navbar icon

                    {/* <Row vertical="center">
                        <span className="navName navCursorPointer">Draven Dale Calabia</span>
                        <img src="https://avatars3.githubusercontent.com/u/21162888?s=460&v=4" alt="avatar" className="navAvatar navCursorPointer" />
                    </Row> */}
      
// ===================================================================================================================
// LoginComponent.js
// import React, {Component} from 'react';
// import './design.css'
 
// class LoginForm extends Component {

//     constructor(props) {
//         super(props)

//         this.state = {
//             email: '',
//             password: '',
//         }
//     }

// 	changeHandler = e => {
// 		this.setState({ [e.target.name]: e.target.value })
// 	}

//     submitHandler = e => {
//         e.preventDefault() // this prevents page refresh
//         console.log(this.state)
//     }

//     render() {

//         const {email, password} = this.state

//         return (
//             <form onSubmit={this.submitHandler}>


//                 <div className="loginInputGroup">
//                 <label htmlFor="email">Email</label>
//                 <input type="text" name="email" className="loginInput" placeholder="Email" value={email} onChange={this.changeHandler}/>
//                 </div>
    
//                 <div className="loginInputGroup">
//                 <label htmlFor="password">Password</label>
//                 <input type="password" name="password" className="loginInput" placeholder="Password" value={password} onChange={this.changeHandler}/>
//                 </div>
    
//                 <button type="submit" className="loginButton" >Login</button>
    

//             </form>
//         )
//     }
// }


// export default LoginForm;

// ---------------------------------------------------------------------------------------
// recommendations.js
// import React from 'react';
// // import NavbarPage from '../components/Navbar';
// // import Sidebar from '../components/Sidebar';
// // import '../App.css';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import { Column } from 'simple-flexbox';
// // import { Row } from 'simple-flexbox';
// import API from '../components/API/songs';

// const Index = () => {
//     return (
//         // <div className="">hello</div>
//         <React.Fragment>
//             <API />
//         </React.Fragment>
//     );
// };

// export default Index;


// ========================================================================================
// search.js

//, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton 

// ====================================================================================================================================================

// dashboard.js

// {test => {
//     // console.log(value);
//     const { artist_list } = test;
//     if(artist_list === undefined || artist_list.length === 0) {
//         return <Spinner />
//     } else {
//         return (
//             <div>
//                 {artist_list.map(item => (
//                     <MainComponent key="index" title={item}
//                     date="as of 25 May 2020, 09:41 PM"
//                     content="The product being developed is best described as social media aggregator and song recommender. It will allow users to capture activities from a range of music artists such as promotions, concerts, new releases and social media updates which will then be displayed on a scrollable feed which is updated regularly. The term “aggregator” is used to label websites or programs which collect related data or items, the content of which to be displayed or linked."
//                     concertPrice="£60"
//                     albumName="Purpose"
//                     location="Miami, Florida"
//                     />
//                 ))}
//                 {/* {console.log(artist_list)} */}
//             </div>

//             )
//         }
//     }}




// {test => {
//     // console.log(value);
//     const { artist_list } = test;
//     if(artist_list.length === 0) {
//         return <Spinner />
//     } else {
//         return (
//             <div>
//                 {this.artist_list.map(item => (
//                     <MainComponent key="index" title={item}
//                     date="as of 25 May 2020, 09:41 PM"
//                     content="The product being developed is best described as social media aggregator and song recommender. It will allow users to capture activities from a range of music artists such as promotions, concerts, new releases and social media updates which will then be displayed on a scrollable feed which is updated regularly. The term “aggregator” is used to label websites or programs which collect related data or items, the content of which to be displayed or linked."
//                     concertPrice="£60"
//                     albumName="Purpose"
//                     location="Miami, Florida"
//                     />
//                 ))}
//                 {/* {console.log(artist_list)} */}
//             </div>

//             )
//         }
//     }
//     }