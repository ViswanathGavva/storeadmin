import {adminRegistersUser} from '../services/auth.service';
import {Request, Response, NextFunction} from 'express';
import convertAccess from '../utils/convertAccess';
import Logger from '../config/logconfig';

export async function SUDO_REGISTER(req:Request, res:Response, next:NextFunction) {
    const {username, password, email, accessLevels} = req.body;
    let user;
    if(!accessLevels){user = await adminRegistersUser({username, password, email});}
    else{user = await adminRegistersUser({username, password, email, accessLevels});}
    res.status(200).send(user);
}

export async function regularRegister(req:Request, res:Response, next:NextFunction) {
    const {username, password, email} = req.body;
    Logger.info("received request to register user: ", username, password, email);
    const registered = await adminRegistersUser({username, password, email});
    // login the user
    if(registered.error){
        res.status(400).send(registered);
    }else{
        const returnUser = registered.user;

            // need to login the user as well
            req.login(returnUser, async(err) => {
                if(err){
                    res.status(400).send(err);
                }else{
                    const accessConverted = await convertAccess(returnUser.userAccess);
                    Logger.info("access converted is " + accessConverted);
                    res.status(200).send({
                        message: "User registered successfully",
                        verified: true,
                        user:{
                            username: returnUser.username,
                            email: returnUser.email,
                            accessLevels: accessConverted,
                        }
                    });
                }
            });
    };
}
