const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    name: {
        type : String ,
        require: true,
    },
    maxMemberCount :{
        type: Number,
        require: true,
    },
    phoneNumber : {
        type :Number,
        require: true,
    },
    rentPerDay : {
        type :Number,
        require:true,
    },
    imageUrls :[],
    currentBookings:[],
    type:{
        type:String,
        require:true,
    },
    desciption :{
       type:String,
       require:true,
    },
    rate:{
        type:Number,
        require:true,
    }
    
},{
    timestamps: true,
})

const roomModel = mongoose.model('rooms',roomSchema);
module.exports = roomModel;

