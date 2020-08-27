import React from 'react';
import spinner from './spinner.gif';

export default () => {
    return (
        <div className="">
            <img src={spinner} 
            alt="Loading..." 
            style={{ width: '200px', margin: '40px auto', display: 'block' }}/>
        </div>
    );
};

