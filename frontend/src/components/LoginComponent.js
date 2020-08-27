import React, {Component} from 'react';
import './design.css'
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class LoginForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        };

        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }

    notify = () => toast("Wow so easy !");

    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    notify = () => toast("Wow so easy !");

    submit(e) {
        e.preventDefault();
        const url = 'https://us-central1-popfeed-268519.cloudfunctions.net/popfeed/users/login';
        axios.post(url, {
            password: this.state.password,
            email: this.state.email
        })
        .then(res => {
            console.log(res);
            localStorage.setItem('cool-jwt', res.data);
            this.props.history.push("/dashboard");

        })      
        .catch(err => {console.log(err);
            toast("Invalid Account");
        
        })
        // try {
        //     const res = axios.post('https://us-central1-popfeed-268519.cloudfunctions.net/popfeed/users/login', { password: this.state.password, email: this.state.email})
        //     console.log(res)
        //     console.log("this?")
        //     localStorage.setItem('cool-jwt', res.data);
        //     this.props.history.push("/dashboard");
        // }  catch (e) {
        //     console.log(e);
        //     console.log("please")
        //     toast("Wow so easy !");
        // }


    }

    render() {
        return (
            <form onSubmit={e => this.submit(e)}>
                <div className="loginInputGroup">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" className="loginInput" placeholder="Email" value={this.state.email} required onChange={e =>this.change(e)}/>
                </div>

                <div className="loginInputGroup">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" className="loginInput" placeholder="Password" value={this.state.password} required onChange={e => this.change(e)}/>
                </div>
                <ToastContainer />
                <button id="loginBtn" type="submit" className="loginButton" >Login</button>
            </form>
        );
    }
}


export default withRouter(LoginForm);