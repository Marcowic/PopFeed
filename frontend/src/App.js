import React, { Component } from 'react';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,  Switch, Route} from 'react-router-dom';
import Login from './pages/login';
import Profile from './pages/profile';
import Index from './pages/index';
import Dashboard from './pages/dashboard';
import Recommendation from './pages/recommendations';
import Favourites from './pages/favourites';
import Artists from './pages/artists';
import Songs from './pages/songs';
import Search from './pages/search';
// import { Provider } from './components/context'
import firebase from 'firebase/app';
import AuthenticatedComponent from './components/Auth';
// import { get_JWT } from './components/API/jwt';
import guestDashboard from './pages/guestDashboard';
import guestSearch from './pages/guestSearch';

const firebaseConfig = {
  apiKey: "AIzaSyCxGk4qmlcLhEWP086TiZdXULzJzOwZ778",
  authDomain: "popfeed-268519.firebaseapp.com",
  databaseURL: "https://popfeed-268519.firebaseio.com",
  projectId: "popfeed-268519",
  storageBucket: "popfeed-268519.appspot.com",
  messagingSenderId: "930648307067",
  appId: "1:930648307067:web:3dba2a8d2c9ac4e43239de"
};


class App extends Component {
    constructor() {
      firebase.initializeApp(firebaseConfig);
      super();

      this.state = {
        loggedInStatus: "NOT_LOGGED_IN",
        user: {}
      }
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize);
        
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    resize = () => this.forceUpdate();
  
    // component={Index}

  render() {

    return (
      // <Provider>
        <Router>
          <Switch>
            <Route path="/" exact
              render={props => (
                <Index {...props} loggedInStatus={this.state.loggedInStatus} />
              )}
            >
            </Route>

            <Route path="/login"
            render={props => (
              <Login {...props} loggedInStatus={this.state.loggedInStatus} />
            )}
            >
            </Route>

            <Route path="/guestDashboard" component={guestDashboard}>
            </Route>
              
            <Route path="/guestSearch" component={guestSearch}>
            </Route>
            
            <AuthenticatedComponent>

            <Route path="/profile" 
            render={props => (
              <Profile {...props} loggedInStatus={this.state.loggedInStatus} />
            )}
            >
            </Route>

            <Route path="/dashboard"
              render={props => (
                <Dashboard {...props} loggedInStatus={this.state.loggedInStatus} />
              )}
            >
            </Route>
            <Route path="/recommendations"
            render={props => (
              <Recommendation {...props} loggedInStatus={this.state.loggedInStatus} />
            )}
            >
            </Route>

            <Route path="/favourites"
            render={props => (
              <Favourites {...props} loggedInStatus={this.state.loggedInStatus} />
            )}
            >
            </Route>

            <Route path="/artists"
            render={props => (
              <Artists {...props} loggedInStatus={this.state.loggedInStatus} />
            )}            
            >
            </Route>

            <Route path="/songs"
            render={props => (
              <Songs {...props} loggedInStatus={this.state.loggedInStatus} />
            )}   
            >
            </Route>

            <Route path="/search"
            render={props => (
              <Search {...props} loggedInStatus={this.state.loggedInStatus} />
            )}   
            >
            </Route>

            </AuthenticatedComponent>

            {/* <Route path="/search" component={Search}>
            </Route> */}

            {/* <Route path="/profile/:username" component={Profile}>
            </Route> */}
          </Switch>
        </Router>
        // {/* </Provider> */}
    );
  }
}

export default App;
