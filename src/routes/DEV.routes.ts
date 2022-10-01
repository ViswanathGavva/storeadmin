import express from "express";
import accesslevels from "../models/config";
import UserType from "../models/UserType";
import Logger from "../config/logconfig";

const router = express.Router();

router.get("/dev/types", (req, res) => {
    Logger.info(req.body);
    res.send(accesslevels);

})

router.get("/dev/type", async (req, res) => {
    Logger.info(req.body);
    const defaultAccessLevel = await UserType.findOne({accessRights: accesslevels.user});
    Logger.info(defaultAccessLevel);
    res.send(defaultAccessLevel);

})



export default router;
