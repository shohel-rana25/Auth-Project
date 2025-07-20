import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String, 
    required: true
  },
  fullname: {
    type: String,
    required: true,
  },
  dept: {
    type: String,
    required: true
  },
  session: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
});

const User = mongoose.model("User", userSchema);
export default User;
