import mongoose, { Model } from 'mongoose';

import { Schema, Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    threads: Number;
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    threads: {
        type: Number,
        default: 0,
    }
});

let UserModel: Model<IUser>;

if (mongoose.models.User) {
  UserModel = mongoose.model<IUser>('User');
} else {
  UserModel = mongoose.model<IUser>('User', userSchema, 'users');
}

export default UserModel;
