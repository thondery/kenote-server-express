import mongoose from 'mongoose'

const Schema = mongoose.Schema

export default {
  username: { 
    type: String, 
    required: true, 
    index: { 
      unique: true 
    } 
  }
}