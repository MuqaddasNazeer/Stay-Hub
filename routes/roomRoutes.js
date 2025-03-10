const express = require("express");
const router = express.Router();

const Room = require('../models/room');

router.get("/getllrooms", async (req, res) => {
    try {


        const rooms = await Room.find({})
        res.send(rooms)
    } catch (error) {
        return res.status(400).json({ message: error })
    }
});

router.post("/getRoomById", async (req, res) => {
    const roomid = req.body.roomid
    try {


        const room = await Room.findOne({ _id: roomid })
        res.send(room)
    } catch (error) {
        return res.status(400).json({ message: error })
    }
});


router.post("/addRoom", async(req, res) => {
    try {


        const newroom = new Room(req.body)
        await newroom.save()
        res.send('New Room Addedd Successfully')
    } catch (error) {
        return res.status(400).json({ message: error })
    }
});

module.exports = router;