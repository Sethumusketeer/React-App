import React, { Component } from 'react';
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';

class App extends Component {
    state = {
        route: 'login', 
        user: null
    };

    setUser = (user) => {
        this.setState({user});
    }

    changeRoute = (route) => {
        this.setState({route});
    }

    render() {
        const { route, user } = this.state; 

        return (
            <div>
                {route === 'login' && <Login setUser={this.setUser} changeRoute={this.changeRoute} />}
                {route === 'register' && <Register changeRoute={this.changeRoute} />}
                {route === 'profile' && <Profile email={user.email} />}
            </div>
        );
    }
}

export default App;