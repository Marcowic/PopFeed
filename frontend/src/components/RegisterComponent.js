import React, {useState} from 'react';
import './design.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Userinput = () => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // async function loginPressed() {
    //     console.log("loginPressed")
    //     const status = await signIn( email, password );
    //     this.props.history.push('/dashboard')
    // }
    // learning how to use forms with react hooks

    const handleSubmit = (event) => {
        event.preventDefault();

        const body = {
              firstname: fname,
              surname: lname,
              password: password,
              email: email
        }
        axios.post('https://us-central1-popfeed-268519.cloudfunctions.net/popfeed/users/register', body)
          // .then(res => console.log(res.data))
          .then(res => {console.log(res);
            toast("Account Registered, Click login page to Sign in")
          })
          .catch(err => {console.log(err);
            toast("Invalid Credentials")
          })

    }

    return (
        <form onSubmit={handleSubmit}>
          <div className="loginInputGroup">
            <label htmlFor="firstName">First Name</label>
            <input id="fNameRegister" type="text" className="loginInput" placeholder="First Name" required value={fname} onChange={event => setFname(event.target.value)}/>
          </div>
  
          <div className="loginInputGroup">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" className="loginInput" placeholder="Last Name" value={lname} required onChange={event => setLname(event.target.value)}/>
          </div>

          <div className="loginInputGroup">
            <label htmlFor="email">Email</label>
            <input type="text" className="loginInput" placeholder="Email" value={email} required onChange={event => setEmail(event.target.value)}/>
          </div>
          <ToastContainer />

          <div className="loginInputGroup">
            <label htmlFor="password">Password </label>
            <input type="password" className="loginInput" placeholder="Password" value={password} required onChange={event => setPassword(event.target.value)}/>
          </div>

          <button type="submit" id="submitRegister" className="loginButton" >Register</button>
      </form>
    );
}


export default Userinput;



        // console.log(fname);
        // console.log(lname);
        // console.log(email);
        // console.log(password);
        // fetch("http://localhost:5000/users/register", {
        //     method: "POST",
        //     body: {
        //         firstname: fname,
        //         surname: lname,
        //         email: email,
        //         password: password
        //     },
        // })
        // const url = 'http://localhost:5000/users/register';

        // let data = {
        //     firstname: fname,
        //     lastname: lname,
        //     email: email,
        //     password: password
        // };

        // var request = new Request(url, {
        //   method: 'POST',
        //   body: data
        //   // headers: new Headers()

        // });

        // fetch(request)
        // .then((response) => {
        //   return response.json();
        // })

        // // .then((myJson) => {
        // //   console.log(myJson)
        // // })

        // .catch((error) => {
        //   console.error('Error', error);
        // });