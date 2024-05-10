import mongoose from "mongoose";

async function connectDataBase() {
  mongoose.connect(process.env.DB_CONNECT_DATABASE);

  return mongoose.connection;
}

export default connectDataBase;
