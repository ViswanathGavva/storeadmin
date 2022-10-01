import {Request, Response, NextFunction} from 'express';
import { IUser } from '../models/User';
import convertAccess from '../utils/convertAccess';

export async function userProfile(req:Request, res:Response, next:NextFunction) {
    const user = req.user as IUser;
    // get id from req.sessionID
    res.status(200).send({
        verified: true,
        message: "welcome to your profile",
        user,
        session: req.sessionID,
        access: await convertAccess(user.userAccess)
    });

}