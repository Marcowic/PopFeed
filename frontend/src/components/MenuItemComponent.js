import React from 'react';
import { string } from 'prop-types';
import './design.css'
// import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';


function MenuItemComponent(props) {
    const { title, link } = props;
    return (
        <Link className="itemContainer" to={link}>
            {title}
        </Link>
    );
}

MenuItemComponent.propTypes = {
    link: string,
    title: string
};

export default MenuItemComponent;




