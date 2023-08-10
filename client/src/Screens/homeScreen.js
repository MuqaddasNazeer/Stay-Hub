import React, { useState, useEffect } from 'react';
import axios from 'axios';
import video from '../Assets/Wave.mp4';
import Room from '../Components/room';

function HomeScreen() {
  
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await axios.get('/api/rooms/getllrooms');
        console.log(response.data);
        setRooms(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error(error);
        setLoading(false);
      }
    }

    fetchRooms();
  }, []);

  return (
    <div>
      <section className='homeScreenVideo'>
        <div className='overlay'></div>
        <video src={video} muted autoPlay loop type="video/mp4"></video>
        <div className='homeContent Container'>
          <div className='textDiv'>
            <span className='smaalText'>Our Packages</span>
            <h1 className='homeTitle'>
              Search Your Holidays
              <h6>Comfy stays at affordable prices, with plenty of options in popular neighborhoods.</h6>
            </h1>
          </div>
          <div className='cardDiv grid'>
            <div className='destinationInput'>
              <label htmlFor='city'>Search your destination</label>
              {/* Your destination input form */}
            </div>
          </div>
        </div>
      </section>

      <div className='container'>
        <div className='row justify-content-center mt-5'>
          {loading ? (
            <h2>Loading.....</h2>
          ) : error ? (
            <h3>Error...</h3>
          ) : (
            rooms.map((room) => (
              <div className='col-md-9 mt-2' key={room._id}>
                <Room room={room} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
