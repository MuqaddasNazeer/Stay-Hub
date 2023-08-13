import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2'
function RoomBookingScreen() {
    const { roomid, fromDate, toDate } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [room, setRoom] = useState();
    const [selectedFromDate, setSelectedFromDate] = useState(moment(fromDate, 'DD-MM-YYYY'));
    const [selectedToDate, setSelectedToDate] = useState(moment(toDate, 'DD-MM-YYYY'));


    const FromDate = moment(selectedFromDate, 'DD-MM-YYYY')
    const ToDate = moment(selectedToDate, 'DD-MM-YYYY')
    const totalDays = moment.duration(ToDate.diff(FromDate)).asDays();
    const [totalAmount, setTotalAmount] = useState();
    useEffect(() => {
        async function fetchRoom() {
            try {
                setLoading(true);

                const response = await axios.post('/api/rooms/getRoomById', { roomid });
                setRoom(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(true);
            }
        }

        fetchRoom();
    }, [roomid]);

    useEffect(() => {
        if (room) {
            const totalDays = moment.duration(selectedToDate.diff(selectedFromDate)).asDays();
            setTotalAmount(room.rentPerDay * totalDays);
        }
    }, [room, selectedFromDate, selectedToDate]);

    

     async function onToken(token) {
        console.log(token);
        const bookingDetails = {
            room,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            fromDate,
            toDate,
            totalAmount,
            totalDays,
            token
        }

        try {
            setLoading(true)
            const result = await axios.post('/api/bookings/bookroom', bookingDetails)
            console.log(result.data)
            setLoading(false)
            Swal.fire('Congrats', 'Your room booked Successfully!!', 'success').then(result=>{
                window.location.href= '/bookings'

            })

        } catch (error) {
            setLoading(false);
            setError(true);
            console.log(error);
            Swal.fire('oops!', 'something went wring', 'error')

        }
    }
    return (
        <div className='m-5'>
            <h2>Booking Screen</h2>

            {loading ? (
                <h2><Loading /></h2>
            ) : room ? (
                <div className='row justify-content-center mt-5 bs'>
                    <div className='col-md-5'>
                        <h1>Name: {room.name}</h1>
                        <img src={room.imageUrls?.[0]} className='img-fluid' alt='Room' />
                    </div>
                    <div className='col-md-5'>
                        <div className='text-right'>
                            <h1>Booking Details</h1>
                            <hr />
                            <b>
                                <p>BookerName: {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                                <p>From Date: {selectedFromDate.format('DD-MM-YYYY')}</p>
                                <p>To Date: {selectedToDate.format('DD-MM-YYYY')}</p>
                                <p>Max Count: {room.maxMemberCount}</p>
                            </b>
                        </div>
                        <div className='text-right'>
                            <h1>Amount</h1>
                            <hr />
                            <b>
                                <p>Total Days: {totalDays}</p>
                                <p>Rent Per Day: {room.rentPerDay}</p>
                                <p>Total Amount:{totalAmount}</p>
                            </b>
                        </div>
                        <div className='text-right'>
                            <StripeCheckout
                                amount={totalAmount * 100}
                                token={onToken}
                                currency='PKR'
                                stripeKey="pk_test_51NeeB7COBq8ELDV8bmFPIeCpZ1cEJU1hb1QlzqGKofjesVoM6gNN3P4mVp09upFT3zZv2oTy6UtdLX0L2vBnf9Yw00Qok6vFE0"

                            >
                                <button className='btn btn-primary'>Pay Now{" "}</button>

                            </StripeCheckout>
                        </div>
                    </div>
                </div>
            ) : (
                <h2><Error /></h2>
            )}
        </div>
    );
}

export default RoomBookingScreen;