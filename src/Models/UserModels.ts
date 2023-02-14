import { Schema, model, SchemaDefinition } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import { IUser, IUserDocument, IUserModal } from '@Core/Models/User';
import { TaskModel } from './TaskModels';
import validator from 'validator';

const UserSchema = new Schema<IUserDocument, IUserModal>({
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
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value: string) {
      if (value.toLowerCase().includes('passwords')) {
        throw new Error('Password cannot contain "password"');
      }
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
  },
  tokens: [
    { token: String, required: true }
  ],
  avatar: {
    type: Buffer
  }
},
  {
    timestamps: true //Automatically adds created/updated
  });


// Virtual property - relation between two entities - not storage in database
UserSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner"
});

// Methods are accessibles on the instances - dont use arrow function
UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toSring() }, process.env.JWT_SECRET, {
    expiresIn: "7 days"
  });
  user.token = user.tokens.concat({ token });
  await user.save();
  return token;
};

UserSchema.methods.convertJSON = async function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;
  return userObject;
};

// Statics are accessibles on the modal
// On UserSchema.statics we can create any custom method
UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("Unable to login");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Unable to login");
  return user;
};

// Hash the plain text password before saving
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password"))
    user.password = await bcrypt.hash(user.password, 8);
  next();
});

// Hash the plain text password before saving
UserSchema.pre("remove", { document: true, query: false }, async function (next) {
  const user = this;
  await TaskModel.deleteMany({ owner: user._id });
  next();
});

export const UserModel = model<IUserDocument, IUserModal>('User', UserSchema);