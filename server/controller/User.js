import {User,ValidateUser} from '../Schema/User.js'
import bcrypt from 'bcryptjs' 
import jwt from 'jsonwebtoken'

const CreateAccount=async(req,res)=>{
    console.log(req.body);
    const Email = req.body.Email
    const {error}=ValidateUser(req.body)
    if(error){
       return res.status(400).send(error.details[0])
    }
    const ExUser=await User.findOne({Email:Email});
    if (ExUser) {
        res.status(400).send("email is already takken");
    }else{
        try {
            let Hash=await bcrypt.hash(req.body.Password,10);
            
            let data=new User({
                Name:req.body.Name,
                Dob:req.body.Dob,
                Email:req.body.Email,
                PhoneNumber:req.body.PhoneNumber,
                Gender:req.body.Gender,
                Occupation:req.body.Occupation,
                Password:Hash,
                idtype:req.body.idtype,
                idNumber:req.body.idNumber,
                Address:req.body.Address,
                State:req.body.State,
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

const UserLogin=async(req,res)=>{
    const Email = req.body.Email

    let UserData=await User.findOne({Email:Email})
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

}
const profileView=async(req, res) => {
    try {
        let result=await User.findById({_id:req.user.id})
    res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
}


const ProfileUpdate=async(req, res)=>{
        const data=req.body
        // console.log(typeof req.body.Balance)
        try {
          if(!req.body.Email){
             let Update=await User.findOneAndUpdate({_id:req.user.id},{$set:data},{new:true})
             if(Update){
                try {
                    res.status(200).send(Update)
                } catch (error) {
                    res.status(400).send(error.message)
                }
            }else{
                // console.log(req.user.id);
                res.send("student not found")
            }
          }
          else{
            res.send("you did not edit email")
        }
        } catch (error) {
            res.status(400).send(error.message)
        }
}

const ChangePassword=async(req,res)=>{
    try {
        console.log(req.body.Password);

        let hash=await bcrypt.hash(req.body.Password,10);
// console.log(hash);
        let update=await User.findOneAndUpdate({_id:req.user.id},{$set:{Password:hash}},{new:true})
        res.status(200).send("updated Successfuly")
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const UserProfiles=async(req,res)=>{
    try {
        const data=await User.find();
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error.message)
    }
}


export default {
    CreateAccount,
    UserLogin,
    profileView,
    ProfileUpdate,
    ChangePassword,
    UserProfiles
}