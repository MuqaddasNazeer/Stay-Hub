import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RoomBookingScreen({ match }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [room, setRoom] = useState();

    useEffect(() => {
        async function fetchRoom() {
            try {
                setLoading(true);
                const response = await axios.post('/api/rooms/getRoomById', { roomid: match.params.roomid });
                console.log(response.data);
                setRoom(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(true);
            }
        }

        fetchRoom();
    }, [match.params.roomid]);

    return (
        <div className='m-5'>
            <h2>Booking Screen</h2>

            {loading ? (
                <h2>Loading...</h2>
            ) : error ? (
                <h2>Error...</h2>
            ) : (
                <div>
                    <div className='row justify-content-center mt-5 bs'>
                        <div className='col-md-5'>
                            <h1>Name: {room.name}</h1>
                            <img src={room.imageUrls?.[0]} className='img-fluid' alt='Room' />
                            {/* Display other room details here */}
                        </div>
                        <div className='col-md-5'>
                            <div className='text-right'>
                                <h1>Booking Details</h1>
                                <hr />
                                <b>
                                    <p>Name: {room.name}</p>
                                    {/* You can add From Date and To Date here */}
                                    <p>Max Count: {room.maxMemberCount}</p>
                                </b>
                            </div>
                            <div className='text-right'>
                                <h1>Amount</h1>
                                <hr />
                                <b>
                                    <p>Total Days:</p>
                                    <p>Rent Per Day: {room.rentPerDay}</p>
                                    <p>Total Amount:</p>
                                </b>
                            </div>
                            <div className='text-right'>
                                <button className='btn btn-primary'>Pay Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RoomBookingScreen;
