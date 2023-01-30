import { config } from "config";
import mongoose from "mongoose";

export default async () => {
  const connect = async () => {
    await mongoose.connect(`${config.DATABASE_URL}`);
  };

  await connect();
  mongoose.connection.on("disconnected", connect);
};
