// // // this will be a class based component

// import React, { Component } from 'react';
// import { Consumer } from '../context'
// import Spinner from '../../images/Spinner';
// import Song from './song';

// class Songs extends Component {
//     render() {
//         return (
//             <Consumer>
//                 {value => {
//                     // console.log(value);
//                     const { song_list, heading} = value;
//                     if(song_list === undefined || song_list.length === 0) {
//                         return <Spinner />
//                     } else {
//                         return (
//                             <React.Fragment> 
//                                 <h3 className="text_center mb-4">{heading}</h3>
//                             <div className="row">
//                                 {song_list.map(item => (
//                                     <Song key={item.track} song={item.track}/>
//                                 ))}
//                             </div>
//                             </React.Fragment>
//                         )
//                     }
//                 }}
//             </Consumer>
//         );
//     }
// }
// // 46:20

// export default Songs;