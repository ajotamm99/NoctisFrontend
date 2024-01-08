
import mongoose from "mongoose";

const connect = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI|| "", {
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
    });
    console.log("Mongo Connection successfully established.");
  } catch (error) {
    //console.log (process.env.MONGODB_URI);
    console.log(error);
    throw new Error("Error conectando a mongoose");
  }
};


export default connect;