import React, { Component } from 'react';
import '../App.css';
import '../components/design.css'
import { Link } from 'react-router-dom';
import Logo from '../images/popbb.jpg';
import Reg from '../components/RegisterComponent'

class Register extends Component {


  render() {
    return (
      <div className="background">
        <div> 
        <img className="logoPos" src={Logo} alt="logo"/>
        </div>
        <div className="loginContainer">
        {/* <h1>status: {this.props.loggedInStatus}</h1> */}
          
          <div className="loginBoxController">
            
          <Link id="loginBtn" className="loginController" to="/login">
              Login
          </Link>

          <Link id="guestBtn" className="loginController" to="/guestDashboard">
              Use Guest
          </Link>

          </div>

          <div className="loginBoxContainer">

            <div className="loginInnerContainer">
              <div className="header">
                Register
              </div>
              <div className="loginBox">
                <Reg/>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    )
  }
}


// class RegisterBox extends Component {

//   constructor(props) {
//     super(props);
//     this.state = { };

//   }

//   submitRegister(e){
  
//   }

//   render() {
//     return(
//       <div className="loginInnerContainer">
//         <div className="header">
//           Register
//         </div>
//         <div className="loginBox">
//           <Reg/>
//         </div>
//       </div>
//     )
//   }
// }

export default Register;