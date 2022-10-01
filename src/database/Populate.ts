import UserType from "../models/UserType";
import accessTypes from "../models/config";
import Logger from '../config/logconfig';

async function isPopulated(): Promise<boolean> {
      const userTypes = await UserType.find();
      if(userTypes.length === 0){return false;}
      return true;
}

export async function DBPopulate():Promise<void>{
      Logger.info("Attempting to populate database with user types...");
      const populated = await isPopulated();
      if(!populated){
            Logger.info("Populating database with user types...");

            for(const type in accessTypes){
                  const newType = new UserType({
                        accessRights: type
                  });
                  await newType.save();
            }
            Logger.info("Database populated with user types.");
      }else{
            Logger.info("Database already populated with user types. - Skipping.");
      }

}