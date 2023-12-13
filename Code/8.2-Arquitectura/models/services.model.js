const { Schema, model } = require('mongoose');

const ServiceSchema = new Schema({
  name:{
    type:String,
    required:true,
    enum:['NORMAL', 'PREMIUM']
  },
  active:{
    type:Boolean,
    default:true
  },
  price:{
    type:Number,
    required:true
  }
})

module.exports = model('Service', ServiceSchema);