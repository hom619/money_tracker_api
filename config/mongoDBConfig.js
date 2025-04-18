import mongoose from "mongoose";
const MONGO_URL = "mongodb://localhost:27017/money_tracker";

export const mongoDBConn = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL);
    conn && console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};
