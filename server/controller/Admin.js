import {Admin,ValidateAdmin} from '../Schema/Admin.js'
import bcrypt from 'bcryptjs' 
import jwt from 'jsonwebtoken'

const CreateAdmin=async(req,res)=>{
    console.log(req.body);
    const Email = req.body.Email
    const {error}=ValidateAdmin(req.body)
    if(error){
       return res.status(400).send(error.details[0])
    }
    const ExUser=await Admin.findOne({Email:Email});
    if (ExUser) {
        res.status(400).send("email is already takken");
    }else{
        try {
            let Hash=await bcrypt.hash(req.body.Password,10);
            
            let data=new Admin({
                Name:req.body.Name,
                Email:req.body.Email, 
                Password:Hash,
            
            });
            
            let result=await data.save();
            result=result.toObject();
            delete result.Password;
            res.status(200).send(result)


        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}

const AdminLogin=async(req,res)=>{
    const Email = req.body.Email

   try {
    let UserData=await Admin.findOne({Email:Email})
    if(!UserData){
        return res.status(400).send("email not found")
    }
    else{
        try {
            let validpassword =await bcrypt.compare(req.body.Password,UserData.Password)
            if(!validpassword){
                return res.status(400).send("not a valid password")
            }
            const id=UserData._id
            const Email=UserData.Email
            const Name=UserData.Name
            
            const UserToken=jwt.sign({id,Email,Name},process.env.JWTKEY)

            res.header('auth',UserToken).send(UserToken)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
   } catch (error) {
    res.status(400).send(error.message)
   }

}

export default{CreateAdmin,AdminLogin}