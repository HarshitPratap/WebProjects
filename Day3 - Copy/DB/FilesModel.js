const mongoose = require('mongoose');
const {Schema} = mongoose;

const File = new Schema({
    email:{
        type:String,
        required:true
    },
    path:{
        type:String,
        required:true
    },
    originalName:{
        type:String,
        required:true
    },
    password:String,
    downloadCount:{
        type:Number,
        required:true,
        default:0
    }
});

module.exports = mongoose.model('Files', File);
