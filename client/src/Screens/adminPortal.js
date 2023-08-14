import React, { useState, useEffect } from 'react';
import { UserOutlined, CalendarOutlined, ApartmentOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import axios from 'axios'
import Loading from '../Components/Loading';
import Error from '../Components/Error';

function AdminPortal() {
    useEffect(() =>{
        if(!JSON.parse(localStorage.getItem("currentUser")).isAdmin){
            window.location.href = '/home'
        }
    })
    return (
        <div>
            <div className='ml-5 mr-5 bs mt-5'>
                <div className='text-center bs'><b>Admin Dashboard</b>
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
                            {/* Content for My Profile */}
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={
                                <span>
                                    <CalendarOutlined />
                                    Manage Bookings
                                </span>
                            }
                            key="2"
                        >
                            <Bookings />
                            {/* Replace with your component */}
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={
                                <span>
                                    <ApartmentOutlined />
                                    Manage Rooms
                                </span>
                            }
                            key="3"
                        >
                          <Rooms/>  {/* Replace with your component */}
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={
                                <span>
                                    <ApartmentOutlined />
                                    Add Room
                                </span>
                            }
                            key="4"
                        >
                            {/* Replace with your component */}
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={
                                <span>
                                    <UsergroupAddOutlined />
                                    Manage Users
                                </span>
                            }
                            key="5"
                        >
                            <Users/>
                            {/* Replace with your component */}
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default AdminPortal;

// ... (your existing imports and components)

export function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const user = JSON.parse(localStorage.getItem('currentUser'));

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const data = await axios.get('/api/bookings/getAllBookings');
                setBookings(data.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(true);
                console.log(error);
            }
        };

        fetchBookings();
    }, []);

    return (
        <div className='row'>
            <div className='col-md-12'>
                <h1 className='text-center bs'>All Bookings</h1>
                {loading && (<Loading />)}
                <div className='table-responsive'>
                    <table className='table table-bordered bookings-table'>
                        <thead>
                            <tr>
                                <th>Booking Id</th>
                                <th>User Id</th>
                                <th>Room</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.length > 0 && bookings.map(booking => (
                                <tr key={booking._id}>
                                    <td>{booking._id}</td>
                                    <td>{user._id}</td>
                                    <td>{booking.room}</td>
                                    <td>{booking.fromDate}</td>
                                    <td>{booking.toDate}</td>
                                    <td>{booking.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* ... (your existing content) */}
            </div>
        </div>
    );
}



export function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const user = JSON.parse(localStorage.getItem('currentUser'));

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const data = await axios.get('/api/rooms/getllrooms');
                setRooms(data.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(true);
                console.log(error);
            }
        };

        fetchBookings();
    }, []);

    return (
        <div className='row '>
            <div className='col-md-12'>
                <h1 className='text-center bs'>All Rooms</h1>
                {loading && (<Loading />)}
                <div className='table-responsive'>
                    <table className='table table-bordered bookings-table'>
                        <thead>
                            <tr>
                                <th>Room Id</th>
                                <th>Room Name</th>
                                <th>Type</th>
                                <th>Rent Per Day</th>
                                <th>Max Members</th>
                                <th>Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.length > 0 && rooms.map(room => (
                                <tr key={room._id}>
                                    <td>{room._id}</td>
                                    <td>{room.name}</td>
                                    <td>{room.type}</td>
                                    <td>{room.rentPerDay}</td>
                                    <td>{room.maxMemberCount}</td>
                                    <td>{room.phoneNumber}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* ... (your existing content) */}
            </div>
        </div>
    );
}








export function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    // const user = JSON.parse(localStorage.getItem('currentUser'));

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true); 
                const data = await axios.get('/api/users/getAllUsers');
                setUsers(data.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(true);
                console.log(error);
            }
        };
        fetchUsers();


    }, []);

    return (
        <div className='row '>
            <div className='col-md-12'>
                <h1 className='text-center bs'>All Users</h1>
                {loading && (<Loading />)}
                <div className='table-responsive'>
                    <table className='table table-bordered bookings-table'>
                        <thead>
                            <tr>
                                <th>User Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Is Admin</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 && users.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                    <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* ... (your existing content) */}
            </div>
        </div>
    );
}


