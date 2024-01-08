import mongoose, { Model } from "mongoose"
const { Schema } = mongoose;


interface IThread extends Document {
  title: string;
  description: string;
  autor: string;
  date: number;
  status: string;
  number: number;
  comments: string[];
}

const threadSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    }, 
    description:  {
      type: String,
      required: true
    },
    autor:  {
      type: String,
      required: true
    },
    date:  {
      type: Number,
      default: Date.now,
      unique: true,
  },
    status: {
      type: String,
      default: "Abierto",
  },
    count:  {
      type: Number,
      default: 0
  },
    comments:  {
      type: [String],
      default: [],
    }
});

let ThreadModel: Model<IThread>;

if (mongoose.models.Thread) {
  ThreadModel = mongoose.model<IThread>('Thread');
} else {
  ThreadModel = mongoose.model<IThread>('Thread', threadSchema, 'trheads');
}

export default ThreadModel;

//export default mongoose.model<IThread>('Thread', threadSchema, "threads");