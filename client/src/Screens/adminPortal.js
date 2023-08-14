import React, { useState, useEffect } from 'react';
import { UserOutlined, CalendarOutlined, ApartmentOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import axios from 'axios'
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import { set } from 'mongoose';
import Swal from 'sweetalert2'

function AdminPortal() {
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
            window.location.href = '/home'
        }
    })
    return (
        <div>
            <div className=''>
                <div className='text-center bs'><b>Admin Dashboard</b>
                    <Tabs defaultActiveKey="1">
                       
                        <Tabs.TabPane
                            tab={
                                <span>
                                    <CalendarOutlined />
                                    Manage Bookings
                                </span>
                            }
                            key="1"
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
                            key="2"
                        >
                            <Rooms />  {/* Replace with your component */}
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={
                                <span>
                                    <ApartmentOutlined />
                                    Add Room
                                </span>
                            }
                            key="3"
                        >
                           < AddRoom/> {/* Replace with your component */}
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={
                                <span>
                                    <UsergroupAddOutlined />
                                    Manage Users
                                </span>
                            }
                            key="4"
                        >
                            <Users />
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





export function AddRoom() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [name, setName] = useState('');
    const [rentPerDay, setRentPerDay] = useState('');
    const [maxMemberCount, setMaxMemberCount] = useState('');
    const [desciption, setDescription] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [imageUrl1, setImageUrl1] = useState('');
    const [imageUrl2, setImageUrl2] = useState('');
    const [imageUrl3, setImageUrl3] = useState('');
    const [type, setType] = useState('');
    const [rate, setRating] = useState('');

    const addRoom = async () => {
        const newRoom = {
            name,
            rentPerDay,
            maxMemberCount,
            desciption,
            phoneNumber,
            type,
            imageUrls: [imageUrl1, imageUrl2, imageUrl3],
            rate
        };

        try {
            setLoading(true);
            const result = await axios.post('/api/rooms/addRoom', newRoom);
            setLoading(false);

            if (result.data) {
                Swal.fire('Congrats', 'Your Room Added Successfully', 'success').then(() => {
                    window.location.href = '/home';
                });
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
            Swal.fire('Oops', 'Enter Valid Credentials', 'error');
        }
    };

    return (
        <div className="add-room-container">
            <div className="add-room-form">
                <h2>Add a New Room</h2>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Room Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Rent Per Day"
                        value={rentPerDay}
                        onChange={(e) => setRentPerDay(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Max Members"
                        value={maxMemberCount}
                        onChange={(e) => setMaxMemberCount(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        className="form-control"
                        placeholder="Description"
                        value={desciption}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="tel"
                        className="form-control"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Image URL 1"
                        value={imageUrl1}
                        onChange={(e) => setImageUrl1(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Image URL 2"
                        value={imageUrl2}
                        onChange={(e) => setImageUrl2(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Image URL 3"
                        value={imageUrl3}
                        onChange={(e) => setImageUrl3(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Rating (1-5)"
                        value={rate}
                        onChange={(e) => setRating(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary" onClick={addRoom}>
                    {loading ? 'Adding...' : 'Add Room'}
                </button>
                {error && <p className="error-message">An error occurred. Please try again later.</p>}
            </div>
        </div>
    );
}

