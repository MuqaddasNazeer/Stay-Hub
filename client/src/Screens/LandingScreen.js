import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import video from '../Assets/black.mp4';

function LandingScreen() {
  return (
    <section className='homeScreenVideo mt-5 col-md-12' >
      <video src={video} muted autoPlay loop type="video/mp4"></video>
      <div className='homeContent Container'>
        <div className='textDiv'>
          <h1 className='homeTitle'>
            <h3 style={{ color: 'white', fontSize: '80px' }}>StayHub</h3>
            <h3 style={{ color: 'white', fontSize: '80px' ,  marginTop: '78px' }}>GHAR JESA SAKOON!!</h3>
            <Link to='/home'>
              <button className='btn btn-primary landinbtn'>Get Started</button>
            </Link>
          </h1>
        </div>
      </div>
    </section>
  )
}

export default LandingScreen
