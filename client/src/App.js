import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; // Import Switch
import HomeScreen from './Screens/homeScreen'; // Import your HomeScreen component
import RoomBookingScreen from './Screens/roomBookingScreen'; // Import your RoomBookingScreen component
import RegisterScreen from './Screens/RegisterScreen'; // Import your RegisterScreen component
import LoginScreen from './Screens/LoginScreen'; // Import your LoginScreen component
import NavBar from './Components/navBar'; // Import your NavBar component
import LandingScreen from './Screens/LandingScreen';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <NavBar />

        <Switch> {/* Use Switch to only render the first matching route */}
          <Route exact path="/home" component={HomeScreen} />
          <Route path="/book/:roomid" component={RoomBookingScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/" component={LandingScreen} />
        </Switch>
        </BrowserRouter>
      </div>
    
  );
}

export default App;
