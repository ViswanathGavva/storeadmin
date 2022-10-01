import User, {IUser}from "../models/User";
import bcrypt from "bcryptjs";
import userTypeConfig from "../models/config";
import UserType from "../models/UserType";
import generateAvatar from "../utils/generateAvatar";
import passport from "passport";
import Logger from '../config/logconfig';

// return of the function
interface IReturnRegister{
    user: IUser;
    error: boolean;
    message: string;
}

// this will be used to create a new user by the admin or a user
// we include the access levels for the function that are optional
// in our middlewares we will check if the user has the right access level if needed
export const adminRegistersUser =
// middlewares will check for admin access level
    async ({email, password, username,accessLevels }:{email:string,password:string,username:string, accessLevels?:string[]}):Promise<IReturnRegister> =>{
        const newUsersAccessLevels = [];
        let firstUser = false;

        // check if the user already exists
        Logger.info("properties provided for registration", email, password, username, accessLevels);

        // check if user exists by email or username
        const user = await User.findOne({$or:[{email},{username}]});
        if(user){return{
            message: "User already exists",
            error: true,
            user: null
        }};
           // if there are no users in the database, default first user to be admin
           const count = await User.countDocuments({});
              if(count === 0){
                    firstUser = true;
              };

        // accessLevels will be an array of strings
        // we will convert the strings to the access level object
        if(!accessLevels || accessLevels.length === 0){
            Logger.info("no access levels provided defaulting to user");
            // if the accessLevels is not provided we will assign the user to the default access level
            const defaultAccessLevel = await UserType.findOne({accessRights: userTypeConfig.user});
            newUsersAccessLevels.push(defaultAccessLevel._id);
        }else{
            // if the accessLevels is provided we will convert the strings to the access level object
            for(const accessRight of accessLevels){
                Logger.info(accessRight + "access right sent in");
                const accessLevel = await UserType.findOne({accessRights: accessRight});
                Logger.info("access level found is " + accessLevel);
                newUsersAccessLevels.push(accessLevel._id);
                Logger.info("access level pushed to array where array is " + newUsersAccessLevels);
            }
        }

        if(firstUser){
            Logger.info("first user is being created");
            // if the user is the first user in the database, we will assign them the admin access level
            const adminAccessLevel = await UserType.findOne({accessRights: userTypeConfig.admin});
            newUsersAccessLevels.push(adminAccessLevel._id);
        }

        // mongoose-local-passport will hash the password and handle it when we register the user

        // generate avatar
        const avatar = generateAvatar();

        // create a new user
        const newUser = new User({
            email,
            username,
            userAccess: newUsersAccessLevels,
            avatar
        });
        // register the user
        const registeredUser = await User.register(newUser, password);
        const regobj = {
            email: registeredUser.email,
            username: registeredUser.username,
            userAccess: registeredUser.userAccess,

        }
        Logger.info("user registered");
        Logger.info(regobj);
        if(registeredUser){

            return{
                message: "User registered",
                error: false,
                user: registeredUser
            }
        }else{
            return{
                message: "error registering user",
                error: true,
                user: null
            }
        }
};
