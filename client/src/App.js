import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreenNavBar from './Components/homeScreenNavBar';
import About from './Components/about';
import NavBar from './Components/navBar';
import HomeScreen from './Screens/homeScreen';
import RoomBookingScreen from './Screens/roomBookingScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Route exact path="/" component={HomeScreen} />
        <Route path="/book/:roomid" component={RoomBookingScreen} />
        {/* <Route exact path="/login" component={LoginScreen} /> */}
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/login" component={LoginScreen } />


      </div>
    </BrowserRouter>
  );
}

export default App;
