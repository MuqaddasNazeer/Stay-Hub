import React, { useState, useEffect } from 'react';
import axios from 'axios';
import video from '../Assets/Wave.mp4';
import Room from '../Components/room';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import moment from 'moment'
import foodeatingvideo from '../Assets/foodeting.jpeg'
// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'// import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;

function HomeScreen() {

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
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
  function filterByDate(dates) {
    // console.log(moment(dates[0]).format('DD-MM-YYYY'));
    // console.log(moment(dates[1]).format('DD-MM-YYYY'));
    setFromDate(moment(dates[0]).format('DD-MM-YYYY'));
    setToDate(moment(dates[1]).format('DD-MM-YYYY'))
  }
  return (
    <div>

      <section className='homeScreenVideo mt-5' >
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
              <div>
                <h1 className='searchyourdestinationlbl'>Enter Your Desire Date</h1>
                <div className='row'>
                  <div className='col-md-3'>
                    <div className='datepicker'>
                      <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='roomSection'>
        <h1 className='bs text-center'style={{border:'3px solid black'}}>Avaliable Rooms</h1>

        <div className='container'>

          <div className='row justify-content-center mt-5'>
            {loading ? (
              <h2><Loading /></h2>
            ) : rooms ? (
              rooms.map((room) => (
                <div className='col-md-9 mt-2' key={room._id}>
                  <Room room={room} fromDate={fromDate} toDate={toDate} />
                </div>
              ))

            ) : (
              <Error />

            )}
          </div>
        </div>
      </section>
      <section>
        <div className="services">
          <div className="container">
            <div className="heading">
              <h1 className="bs text-center " style={{border:'3px solid black'}}>SERVICES</h1>
              <p>Our Hotel is among top-rated hotels which provide very smooth and comfortable rooms with excellent services and also at a low cost</p>
            </div>
            <div className="content bs">
              <div className="boxes-container">
                <div className="box">
                  <div className="text">
                    <i className="fa-solid fa-champagne-glasses"></i>
                    <h3>Delicious Food</h3>
                  </div>
                </div>
                <div className="box">
                  <div className="text">
                    <i className="fa-solid fa-person-biking"></i>
                    <h3>Fitness</h3>
                  </div>
                </div>
                <div className="box">
                  <div className="text">
                    <i className="fa-solid fa-utensils"></i>
                    <h3>Fam Restaurant</h3>
                  </div>
                </div>
                <div className="box">
                  <div className="text">
                    <i className="fa-solid fa-spa"></i>
                    <h3>Beauty Spa</h3>
                  </div>
                </div>
              </div>
              <div className="image-container">
                <img src={foodeatingvideo} alt="Food Eating" className="img" />
              </div>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}

export default HomeScreen;