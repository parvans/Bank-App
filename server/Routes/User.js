import express from "express";
import User from '../controller/User.js';
import Auth from '../auth/auth.js'

const router=express.Router()

router.post('/user/createAccount',User.CreateAccount)
router.post('/user/login',User.UserLogin)
router.get('/user/profile',Auth,User.profileView)
router.put('/user/Update',Auth,User.ProfileUpdate)
router.put('/user/ChangePassword',Auth,User.ChangePassword)
router.get('/user/profiles',User.UserProfiles)


export default router


