import mongoose from "mongoose";
import Joi from 'joi'

const User=mongoose.model('User',new mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    Dob:{
        type: String,
        required: true
    },
    Email:{
            type: String,
            required: true
    },
    PhoneNumber:{
        type:Number,
        required: true
    },
    Gender:{
        type: String,
            required: true
    },
    Occupation:{
        type: String,
    },
    Password:{
          type: String,
          required: true
    },
    Balance:{
        type:Number,
        required: true,
        default:1000
    },
    idtype:{
        type: String,
        required: true
    },
    idNumber:{
        type:Number,
        required: true
    },
    Address:{
        type: String,
        required: true
    },
    State:{
        type: String,
        required: true
    }
}));

const ValidateUser=(value)=>{
    const schema=Joi.object({
        Name:Joi.string().required(),
       Dob:Joi.string().required(),
       Email:Joi.string().required(),
       PhoneNumber:Joi.number().required(),
       Gender:Joi.string().required(),
       Occupation:Joi.string(),
       Password:Joi.string().required(),
       idtype:Joi.string().required(),
       idNumber:Joi.number().required(),
       Address:Joi.string().required(),
       State:Joi.string().required(),
    });

    const result=schema.validate(value);

    return result;
}

export {User, ValidateUser}