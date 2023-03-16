import { Router } from "express";
const router = Router();

/** import all controllers */
import * as controller from '../controllers/appController.js';
import Auth ,{localVariables} from '../middleware/auth.js';
import { registerMail } from '../controllers/mailer.js'

router.route('/register').post(controller.register)

router.route('/registerMail').post(registerMail); // send the email

router.route('/authenticate').post(controller.verifyUser,(req,res)=> res.end())
router.route('/login').post(controller.verifyUser,controller.login); // login in app

router.route('/users').get(controller.getUsers)
router.route('/user/:username').get(controller.getUser)
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) // generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession)



router.route('/updateUser').put(Auth, controller.updateUser)

router.route('/resetPassword').put(controller.verifyUser,controller.resetPassword)

export default router