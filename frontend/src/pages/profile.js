import React, { Component } from 'react';
import NavbarPage from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Column } from 'simple-flexbox';
import { Row } from 'simple-flexbox';
import '../components/design.css'
import axios from 'axios';
import { get_JWT } from '../components/API/jwt';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      fname: '',
      lname: '',
      email: '',
      password: '',
      cpassword: '',
      userData: []
  };

    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);

  }
  change(e) {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  async componentDidMount() {
    const jwt = get_JWT();
    window.addEventListener('resize', this.resize);
    try {
        // const res = await axios.get('https://us-central1-popfeed-268519.cloudfunctions.net/popfeed/artist?id=' + jwt) // this gives a promise back
        const res = await axios.get('http://localhost:5000/users?id=' + jwt) // this gives a promise back
        console.log(res.data)
        this.setState({userData: res.data})
    }  catch (e) {
        console.log(e);
    }
  }

  async updateProfile() {
    const jwt = get_JWT();
    window.addEventListener('resize', this.resize);
    try {
        // const res = await axios.get('https://us-central1-popfeed-268519.cloudfunctions.net/popfeed/artist?id=' + jwt) // this gives a promise back
        const res = await axios.get('http://localhost:5000/users?id=' + jwt) // this gives a promise back
        console.log(res.data)
        this.setState({userData: res.data})
    }  catch (e) {
        console.log(e);
    }
  }


  submit(e) {
    e.preventDefault();
    const jwt = get_JWT();
    var fn = ''
    var ln = ''
    var em = ''
    var pw = this.state.password

    if(this.state.fname === '') {
      fn = this.state.userData.firstname
    } else {
      fn = this.state.fname
    }

    if(this.state.lname === '') {
      ln = this.state.userData.surname
    } else {
      ln = this.state.fname
    }
  
    if(this.state.email === '') {
      ln = this.state.userData.email
    } else {
      em = this.state.email
    }


    if (this.state.password === this.state.cpassword) {
      const url = 'http://localhost:5000/users/profileUpdate';
      axios.post(url, {
          id: jwt,
          firstname: fn,
          surname: ln,
          email: em,
          password: pw
      })
      .then(res => {
          console.log(res);
          toast("Profile Updated", {
            position: toast.POSITION.TOP_CENTER
          })
          this.updateProfile()

      })      
      .catch(err => console.log(err))
    } else {
      toast("Confirmed password doesn't match!", {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }


  render() {
    return (
        <Row className="mainContainer">
            <ToastContainer />
            <Sidebar />
            <Column flexGrow={1} className="mainBlock">
                <NavbarPage />
                <div className="mainContent">
                <span className="navTitle">Profile</span>
                    {/* THe profile page for {this.props.match.params.username} */}

                    <div className="profileContainer">
                      <div className="profileBox">
                        <form onSubmit={e => this.submit(e)}>
                            <div className="loginInputGroup">
                              <label htmlFor="firstName">First Name</label>
                              <input name="fname" type="text" className="loginInput" placeholder={this.state.userData.firstname} value={this.state.fname} onChange={e =>this.change(e)}/>
                            </div>
                    
                            <div className="loginInputGroup">
                              <label htmlFor="lastName">Last Name</label>
                              <input name="lname" type="text" className="loginInput" placeholder={this.state.userData.surname} value={this.state.lname} onChange={e =>this.change(e)}/>
                            </div>

                            <div className="loginInputGroup">
                              <label htmlFor="email">Email</label>
                              <input name="email" type="text" className="loginInput" placeholder={this.state.userData.email} value={this.state.email} onChange={e =>this.change(e)}/>
                            </div>

                            <div className="loginInputGroup">
                              <label htmlFor="password">Password </label>
                              <input name="password" type="password" className="loginInput" placeholder="Password" value={this.state.password} required onChange={e =>this.change(e)}/>
                            </div>
    
                            <div className="loginInputGroup">
                              <label htmlFor="password">Confirm Password</label>
                              <input name="cpassword" type="password" className="loginInput" placeholder="Password" value={this.state.cpassword} required onChange={e =>this.change(e)}/>
                            </div>

                            <button type="submit" className="loginButton" >Save</button>
                        </form>
                      </div>
                    </div>
                </div>
            </Column>
        </Row>
    );
  }
}

export default Login;
