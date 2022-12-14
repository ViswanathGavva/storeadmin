import express from "express";
import passport from "passport";
import connectEnsureLogin from "connect-ensure-login";
import {SUDO_REGISTER, regularRegister} from "../controllers/auth.controller";
import {SUDOMiddleware, registerMiddleware} from "../middlewares/auth.middlewares";
import { registrationValidation,SUDOOptionalUserAccessLevel } from "../middlewares/validators/validators";


const router = express.Router();

// @route   POST /sudoregister
// @desc    Sudo register
// @access  Private
// admin only access for creating new users where that user can be an admin or any other regular user
// difference is that sudo register accepts user access levels as params {admin, user, banned, moderator}
// flow goes like this:
// 1. user sends a request to /sudoregister
// 2. server checks if the user is logged in
// 3. if user is logged in, server checks if the user is an admin
// 4. if user is an admin, server checks if params are valid
// 5. if params are valid, server creates a new user with the given params

router.post("/sudoregister",
    connectEnsureLogin.ensureLoggedIn("/loginerror"),
    registrationValidation,
    SUDOOptionalUserAccessLevel,
    SUDOMiddleware,
    SUDO_REGISTER);

router.post("/login", passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/error",
    failureFlash: true
}
));

router.post("/register", registrationValidation, registerMiddleware, regularRegister);

router.get("/logout", (req, res,next) => {
    req.logout((err) =>{
        if (err) { return next(err); }
        res.redirect('/logoutsuccess');
      });
})

router.get("/logoutsuccess", (req, res) => {
    res.status(200).send({
        message: "You have been logged out"
    });
})


export default router;
