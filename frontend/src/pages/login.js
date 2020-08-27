import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import Log from '../components/LoginComponent';
import Logo from '../images/popbb.jpg';


class Login extends Component {
  // constructor(props) {
  //   super(props);
  // }


  render() {
    return (
      <div className="background">
        <div> 
        <img className="logoPos" src={Logo} alt="logo"/>
        </div>
        <div className="loginContainer">
          <div className="loginBoxController">

          <Link id="registerBtn" className="loginController" to="/">
              Register
          </Link>

          <Link id="guestBtn" className="loginController" to="/guestDashboard">
              Use Guest
          </Link>

          </div>

          <div className="loginBoxContainer">

          <div className="loginInnerContainer">
            <div className="header">
              Login
            </div>
                <div className="loginBox">
                  <Log/>
              </div>
            </div>
          </div>
          
        </div>
      </div>
  //     <Row className="mainContainer">
  //     <Sidebar />
  //     <Column flexGrow={1} className="mainBlock">
  //         <NavbarPage />
          
  //         <div className="mainContent">
  //             <span className="multiTitle">Test</span>
  //         </div>
  //     </Column>
  // </Row>

    )
  }
}


export default Login;