import React, { Component } from 'react';
import { get_JWT } from './API/jwt';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Spinner from '../images/Spinner';

class AuthenticateComponent extends Component {


    state = {
        user: null
    }

    componentDidMount() {
        const jwt = get_JWT();
        if(!jwt) {
            this.props.history.push('/Login')
        }

        axios.post('https://us-central1-popfeed-web-app.cloudfunctions.net/popfeed/users/verify', {id: jwt})
        .then (res => this.setState({user: res.data}))
        .catch(err => {
            console.log(jwt);
            localStorage.removeItem("cool-jwt");
            this.props.history.push('/Login')});
    }

    render() {
        if(this.state.user === null){
            return (
                // <div>Loading...</div>
                <Spinner/>
                
            );
        }
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default withRouter(AuthenticateComponent);