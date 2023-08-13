const express = require("express");
const router = express.Router();
const stripe = require('stripe')('sk_test_51NeeB7COBq8ELDV8MnfGpEx0F8ZMp7RTIabULCXSsWqfxwhMTDhLEUmp2Fo9kXeLA0mmW8eLa1R565o7wZ81tBLk00hJ2HoUrx');
const Booking = require('../models/booking');
const Room = require('../models/room');

router.post("/bookroom", async (req, res) => {
    const {
        room,
        userid,
        fromDate,
        toDate,
        totalAmount,
        totalDays,
        token
    } = req.body;

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const payment = await stripe.charges.create({
            amount: totalAmount * 100,
            customer: customer.id,
            currency: 'PKR',
            receipt_email: token.email
        });

        if (payment.status === 'succeeded') {
            const newBooking = new Booking({
                room: room.name,
                roomid: room._id,
                fromDate,
                toDate,
                totalAmount,
                totalDays,
                transactionId: payment.id // Use payment id here
            });

            const booking = await newBooking.save();
            const roomtemp = await Room.findOne({ _id: room._id });
            roomtemp.currentBookings.push({
                bookingid: booking._id,
                fromDate: fromDate,
                toDate: toDate,
                userid: userid,
                status: booking.status
            });
            await roomtemp.save();

            return res.send('Room booked successfully!');
        } else {
            return res.status(400).json({ error: 'Payment failed.' });
        }
    } catch (error) {
        console.error('Error:', error); // Log the error for debugging
        return res.status(400).json({ error: 'An error occurred during payment processing.' });
    }
});

module.exports = router;
