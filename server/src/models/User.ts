import mongoose from 'mongoose';
import IUser from './interfaces/IUser';

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc: any, ret: { password: string; }) => {
        delete ret.password;
      }
    }
  },
);

const UserModel = mongoose.model('users', userSchema);

export default UserModel;
