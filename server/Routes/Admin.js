import express from "express";
import Admin from '../controller/Admin.js'
import Auth from '../auth/auth.js'

const router=express.Router()

router.post('/admin/Register',Admin.CreateAdmin)
router.post('/admin/Login',Admin.AdminLogin)


export default router
