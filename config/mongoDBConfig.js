import mongoose from "mongoose";
const MONGO_URL = process.env.MONGO_URL;

export const mongoDBConn = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL);
    conn && console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};
