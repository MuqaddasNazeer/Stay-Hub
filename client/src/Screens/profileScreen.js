import React, { useEffect, useState } from 'react';
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import axios from 'axios';
import Loading from '../Components/Loading';
import Error from '../Components/Error';

function ProfileScreen() {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    if (!user) {
      window.location.href = '/login'; // Fixed the redirection syntax
    }
  }, []);

  return (
    <div className='cont' style={{ marginTop: '80px' }}>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane
          tab={
            <span>
              <UserOutlined />
              My Profile
            </span>
          }
          key="1"
        >
          <h1 className='text-center bs'><b>My Profile</b></h1>
          <div className='row bs'>
            <div className='col-md-6'>
              <br />
              <p><b>Name :</b> {user.name}</p>
              <p><b>Email :</b> {user.email}</p>
              <p><b>Admin :</b> {user.isAdmin ? 'Yes' : 'No'}</p>
              {/* <p><b>Password :</b> {user.password}</p> */}
            </div>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <CalendarOutlined />
              My Bookings
            </span>
          }
          key="2"
        >
          <MyBookings /> {/* Render the component */}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default ProfileScreen;


export function MyBookings() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    let isMounted = true; // Add this flag to track component's mounted state

    async function fetchData() {
      try {
        console.log('User ID:', user._id);
        setLoading(true);
        const response = await axios.get('/api/bookings/getBookingsByUserId', { userid: user._id });
        if (isMounted) {
          // Update state only if the component is still mounted
          setBookings(response.data);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setLoading(false);
          setError(error);
        }
        console.log(error);
      }
    }

    fetchData();

    // Cleanup function to cancel any ongoing async operations
    return () => {
      isMounted = false; // Set the flag to false when unmounting
    };
  }, [user._id]);

  return (
    <div>
      <h1 className='text-center bs'><b>My bookings</b></h1>
      <div className='row bs'>
        <div className='col-md-6'>
          {loading && <Loading />}

          {bookings && bookings.length === 0 ? (
            <p>No booking available. </p>
          ) : (
            bookings.map(booking => (
              <div key={booking._id} className='bs'>
                <p><b>Room BookerName :</b> {user.name}</p>
                <p><b>Booker Id :</b>{user._id}</p>
                {/* <p><b>Room Name :</b> {}</p> */}
                <p><b>RoomId : </b> {booking.roomid}</p>
                <p><b>FromDate :</b>{booking.fromDate}</p>
                <p><b>ToDate :</b>{booking.toDate}</p>
                <p><b>Amount :</b>{booking.totalAmount}</p>
                <p><b>Status :</b> {booking.status === 'booked' ? 'Confirmed!' : 'Canceled'}</p>
              </div>
            ))
          )}
          {error && <Error error={error} />}
        </div>
      </div>
    </div>
  );
}
