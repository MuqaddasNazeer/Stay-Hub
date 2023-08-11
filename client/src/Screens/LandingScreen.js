import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

function LandingScreen() {
  return (
    <div className='row landing mt-5'>
      <div className='col-md-12 text-center mt-5'>
         <h3 style={{color:'white' ,fontSize:'100px'}}>StayHub</h3>
         <h1 style={{color:'white',  paddingTop: '80px'}}>GHAR JESA SAKOON!!</h1>
         <Link to= '/home'>
         <button className='btn btn-primary landinbtn'>Get Started</button>
         </Link>
      </div>
    </div>
  )
}

export default LandingScreen
