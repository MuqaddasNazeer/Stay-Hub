import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomeScreen from './Screens/homeScreen';
import RoomBookingScreen from './Screens/roomBookingScreen';
import RegisterScreen from './Screens/RegisterScreen';
import LoginScreen from './Screens/LoginScreen';
import NavBar from './Components/navBar';
import LandingScreen from './Screens/LandingScreen';
import moment from 'moment';
import ProfileScreen from './Screens/profileScreen';

function App() {
  const selectedFromDate = moment(); // You can set an initial date here
  const selectedToDate = moment().add(1, 'days'); // Example: One day after selectedFromDate

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
        <Route exact path="/home">
            {/* Pass the defined props */}
            <HomeScreen selectedFromDate={selectedFromDate} selectedToDate={selectedToDate} />
          </Route>
          <Route path="/" component={LandingScreen} />
          <Route path="/book/:roomid/:fromDate/:toDate" component={RoomBookingScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path= "/bookings" component= {ProfileScreen}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;