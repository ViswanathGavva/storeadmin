"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRegistersUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const config_1 = __importDefault(require("../models/config"));
const UserType_1 = __importDefault(require("../models/UserType"));
const generateAvatar_1 = __importDefault(require("../utils/generateAvatar"));
const logconfig_1 = __importDefault(require("../config/logconfig"));
// this will be used to create a new user by the admin or a user
// we include the access levels for the function that are optional
// in our middlewares we will check if the user has the right access level if needed
const adminRegistersUser = 
// middlewares will check for admin access level
({ email, password, username, accessLevels }) => __awaiter(void 0, void 0, void 0, function* () {
    const newUsersAccessLevels = [];
    let firstUser = false;
    // check if the user already exists
    logconfig_1.default.info("properties provided for registration", email, password, username, accessLevels);
    // check if user exists by email or username
    const user = yield User_1.default.findOne({ $or: [{ email }, { username }] });
    if (user) {
        return {
            message: "User already exists",
            error: true,
            user: null
        };
    }
    ;
    // if there are no users in the database, default first user to be admin
    const count = yield User_1.default.countDocuments({});
    if (count === 0) {
        firstUser = true;
    }
    ;
    // accessLevels will be an array of strings
    // we will convert the strings to the access level object
    if (!accessLevels || accessLevels.length === 0) {
        logconfig_1.default.info("no access levels provided defaulting to user");
        // if the accessLevels is not provided we will assign the user to the default access level
        const defaultAccessLevel = yield UserType_1.default.findOne({ accessRights: config_1.default.user });
        newUsersAccessLevels.push(defaultAccessLevel._id);
    }
    else {
        // if the accessLevels is provided we will convert the strings to the access level object
        for (const accessRight of accessLevels) {
            logconfig_1.default.info(accessRight + "access right sent in");
            const accessLevel = yield UserType_1.default.findOne({ accessRights: accessRight });
            logconfig_1.default.info("access level found is " + accessLevel);
            newUsersAccessLevels.push(accessLevel._id);
            logconfig_1.default.info("access level pushed to array where array is " + newUsersAccessLevels);
        }
    }
    if (firstUser) {
        logconfig_1.default.info("first user is being created");
        // if the user is the first user in the database, we will assign them the admin access level
        const adminAccessLevel = yield UserType_1.default.findOne({ accessRights: config_1.default.admin });
        newUsersAccessLevels.push(adminAccessLevel._id);
    }
    // mongoose-local-passport will hash the password and handle it when we register the user
    // generate avatar
    const avatar = (0, generateAvatar_1.default)();
    // create a new user
    const newUser = new User_1.default({
        email,
        username,
        userAccess: newUsersAccessLevels,
        avatar
    });
    // register the user
    const registeredUser = yield User_1.default.register(newUser, password);
    const regobj = {
        email: registeredUser.email,
        username: registeredUser.username,
        userAccess: registeredUser.userAccess,
    };
    logconfig_1.default.info("user registered");
    logconfig_1.default.info(regobj);
    if (registeredUser) {
        return {
            message: "User registered",
            error: false,
            user: registeredUser
        };
    }
    else {
        return {
            message: "error registering user",
            error: true,
            user: null
        };
    }
});
exports.adminRegistersUser = adminRegistersUser;
//# sourceMappingURL=auth.service.js.map