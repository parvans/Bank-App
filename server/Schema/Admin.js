import mongoose from "mongoose";
import Joi from 'joi'

const Admin=mongoose.model('Admin',new mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    Email:{
            type: String,
            required: true
    },
    Password:{
          type: String,
          required: true
    },

}));

const ValidateAdmin=(value)=>{
    const schema=Joi.object({
        Name:Joi.string().required(),
       Email:Joi.string().required(),
       Password:Joi.string().required(),
     
    });

    const result=schema.validate(value);

    return result;
}

export {Admin, ValidateAdmin}