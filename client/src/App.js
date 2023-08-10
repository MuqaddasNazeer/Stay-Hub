import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreenNavBar from './Components/homeScreenNavBar';
import About from './Components/about';
import NavBar from './Components/navBar';
import HomeScreen from './Screens/homeScreen';
import RoomBookingScreen from './Screens/roomBookingScreen';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Route exact path="/" component={HomeScreen} />
        <Route path="/book/:roomid" component={RoomBookingScreen} />
        {/* <Route exact path="/about" component={About} /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
