var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema =new Schema({
    title:{
      type:String,
      required:true
    },
    time:{
     type:String,
     required:true
    },
    location:{
        type:String,
        required:false
    },
    description:{
        type:String,
        required:false
    }
},{ timestamps: true });

const Event = mongoose.model('event',eventSchema);

module.exports= Event;