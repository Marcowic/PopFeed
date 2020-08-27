import React, { Component } from 'react';
import { Column, Row } from 'simple-flexbox';
import '../App.css';
import './design.css';
// import Logo from '../images/Logo.png'
import Burger from '../images/burgerMenu';
import MenuItemComponent from './MenuItemComponent';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import { withRouter } from 'react-router-dom';


const styles = StyleSheet.create({
  containerMobile: {
      transition: 'left 0.5s, right 0.5s',
      position: 'absolute',
      width: 255,
      height: 'calc(100% - 32px)',
      zIndex: 901
  },
  mainContainerMobile: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  mainContainerExpanded: {
      width: '100%',
      minWidth: '100vh',
  },
  hide: {
      left: -255
  },
  show: {
      left: 0
  }
});


class Sidebar extends Component {
  // constructor(props) {
  //   super(props);
  // }

  state = { expanded: false };

  onItemClicked = (item) => {
      this.setState({ expanded: false });
      return this.props.onChange(item);
  }

  isMobile = () => window.innerWidth <= 768;
  
  toggleMenu = () => this.setState(prevState => ({ expanded: !prevState.expanded }));

  renderBurger = () => {
      return <div onClick={this.toggleMenu} className="burgerIcon">
          <Burger />
      </div>
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  logout() {
    localStorage.removeItem("cool-jwt")
    console.log("please_work")
  }

  render() {
    const { expanded } = this.state;
    const isMobile = this.isMobile();

    return (
      <div style={{ position: 'relative' }}>

        <Row className="sidebar_mainContainer" breakpoints={{ 768: css(styles.mainContainerMobile, expanded && styles.mainContainerExpanded) }}>
            {(isMobile && !expanded) && this.renderBurger()}

            <Column className='sidebar_container' breakpoints={{ 768: css(styles.containerMobile, expanded ? styles.show : styles.hide) }}>
            
              <Link className="logoCon" horizontal="center" vertical="center" to="/dashboard">
                <p className="logoTitle">Dashboard</p>
              </Link>
            
              <Column className="menuItemList">
                  <MenuItemComponent aria-label="profile button" title="Profile" link="/profile"/>
                  <MenuItemComponent aria-label="artist button" title="Artists" link="/artists"/>
                  <MenuItemComponent aria-label="songs button" title="Songs" link="/songs"/>
                  <MenuItemComponent aria-label="favourites button" title="Favourites" link="/favourites"/>
                  <MenuItemComponent aria-label="recommendations button" title="Recommendations" link="/recommendations"/>   
                  <div className="sidebar_seperator"></div>
                  <Link className="itemContainer" aria-label="sign out button" to="/" onClick={this.logout}>Sign Out</Link>
              </Column>


            </Column>

            {isMobile && expanded && <div className="sidebar_outsideLayer" onClick={this.toggleMenu}></div>}
        </Row>
      </div>
    );
  }
}

export default withRouter(Sidebar);


