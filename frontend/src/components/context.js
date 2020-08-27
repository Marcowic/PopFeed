
import React, { Component } from 'react';
import axios from 'axios';


const Context = React.createContext();


export class Provider extends Component {

    state = {
        song_list: [],
        heading: 'Top 10 Songs'
    };
    // life cycle method. it runs when the component mounts
    // fetch 36:37
    componentDidMount() {
        axios.get('') // this gives a promise back
        .then(res => {
            // console.log(res.data)
            this.setState({song_list: res.data.message.body.song_list})
        }) // using axios, you use res.data
        .catch(err => console.log(err));
    }
    
    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;

// redux 