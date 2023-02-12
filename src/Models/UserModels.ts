import { User } from '@Core/Models/User';
import mongoose from 'mongoose';
import validator from 'validator';

export const UserSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value: string) {
      if (!validator.isEmail(value))
        throw new Error('Email is invalid');
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value: number) {
      if (value < 0) {
        throw new Error('Age must be a positive number');
      }
    }
  }
});

export const UserModel = mongoose.model('User', UserSchema);


const me = new UserModel({
  name: 'Dat',
  age: 12,
  email: 'dathoang9797gmsdail.com'
})

me.save().then((result) => {
  console.log({ result })
}).catch(console.log)