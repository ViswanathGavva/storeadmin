import config from "../config/defaults";
import { ConnectOptions, connect } from "mongoose";
import Logger from '../config/logconfig';

const connectDB = async () => {
      try{
            const mongoURI: string = config.mongoURI;
            await connect(mongoURI);
            Logger.info("MongoDB Connected...");
      } catch(err) {
            Logger.error("VISWAA"+config.mongoURI+""+err.message);
            process.exit(1);
      }
};

export default connectDB;
