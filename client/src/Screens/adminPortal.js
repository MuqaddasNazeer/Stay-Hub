import React, { useState, useEffect } from 'react';
import { UserOutlined, CalendarOutlined, ApartmentOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import axios from 'axios'
import Loading from '../Components/Loading';
import Error from '../Components/Error';

function AdminPortal() {
    return (
        <div>
            <div className='ml-5 mr-5 bs mt-5'>
                <div className='text-center mt-3'><b>Admin Dashboard</b>
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
                             <Bookings/>
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
                            {/* Replace with your component */}
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
                            {/* Replace with your component */}
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default AdminPortal;

export function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const data = await axios.get('/api/bookings/getAllBookings');
                setBookings(data.data); // Assuming data.data holds the actual booking data
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
            <div className='col-md-10'>
                <h1>Bookings</h1>
                {loading && (<Loading />)}
                {bookings && bookings.length && (<h1>There are a total {bookings.length} bookings</h1>)}
            </div>
        </div>
    );
}
