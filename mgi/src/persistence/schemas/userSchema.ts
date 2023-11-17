import { IUserPersistence } from '../../dataschema/IUserPersistence';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    domainId: { 
      type: String,
      unique: true
    },

    username: {
      type: String,
      required: [true, 'Please enter a username'],
      index: true,
    },

    email: {
      type: String,
      lowercase: true,  
      unique: true,
      index: true,
    },

    password: String,


    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: true },
);

export default mongoose.model<IUserPersistence & mongoose.Document>('User', UserSchema);
