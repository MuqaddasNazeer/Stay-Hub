const mongoose = require('mongoose')
const bookingSchema = mongoose.Schema({
    room:{
        type : String,require:true
    },

    roomid:{
        type : String,require:true
    },

    userid:{
        type : String,require:true
    },

    fromDate:{
        type : String,require:true
    },

    toDate:{
        type : String,require:true
    },
    totalAmount:{
        type : Number,require:true
    },

    totalDays:{
        type : Number,require:true
    },
    transactionId:{
        type:String,required:true
    },

    status:{
        type : String,require:true,default:'booked'
    },

},{
    timestamps:true
})

const bookingModel = mongoose.model('bookings',bookingSchema);
module.exports = bookingModel;