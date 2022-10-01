import UserType from "../models/UserType";
import { IUser } from '../models/User';

async function convertAccess(access:string[]){
      const stringedAccess = [];
      for(let i=0; i<access.length; i++){
          const accessId = access[i];
         // Logger.info("accessId: ", accessId);
          // find the access type from the mongoid
          const accessType = await UserType.findById(accessId);
        // Logger.info("accessType: ", accessType);
          if(accessType){
              stringedAccess.push(accessType.accessRights);
          }

      }
    //  Logger.info("stringedAccess: ", stringedAccess);
      return stringedAccess;
  }

  export default convertAccess;
