import React, { useState } from "react";
import {ImageBackground, LeftContainer} from "./LoginScreen";
import BankBackground from "../assets/bankBackground.jpeg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
export const RegisterScreen = () => {
  const[name,setName]=useState();
  const [dob,setDob]=useState();
  const[email,setEmail]=useState();
  const [phoneNumber,setPhoneNumber]=useState();
  const [gender,setGender]=useState();
  const [Occupation,setOccupation]=useState();
  const [idtype,setIdtype]=useState();
  const[idNumber,setIdnumber]=useState();
  const[address,setAddress]=useState();
  const[state,setState]=useState();
  const[password,setPassword]=useState();
  const[conformPassword,setConformPassword]=useState();

  var url="http://localhost:8000"
  const navigate=useNavigate();
  const userRegister=()=>{
    if(!name || !dob || !email || !phoneNumber ||!gender  ||!idtype ||!idNumber ||!address ||!state ||!password ||!conformPassword){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the fields",
      })
    }else{
      if(password !==conformPassword){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password not matching",
        })
      }else{
        axios.post(url+'/api/user/createAccount',{
          Name:name,
          Dob:dob,
          Email:email,
          PhoneNumber:phoneNumber,
          Gender:gender,
          Occupation:Occupation,
          Password:password,
          idtype:idtype,
          idNumber:idNumber,
          Address:address,
          State:state
        })
        .then(res=>{
          console.log(res.data);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Account Created",
          })
          navigate('/user/login')
        }).catch(err=>{
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email is already Taken",
          })
        })
      }
    }
  }

  return (
    <Container>
      <RightContainer>
        <FormContainer>
        <MainTitle>Register</MainTitle>
        <Row>
          {/* Fulltname */}
          <CustomInputRow placeholder="Full Name" name="Fullname" onChange={e=>setName(e.target.value)} required />

          {/* Gender */}
          <CustomSelect required onChange={e=>setGender(e.target.value)}>
            <option disabled selected>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </CustomSelect>
        </Row>

        <DivCenterInput>
          {/* Email */}
          <CustomInput placeholder="Email" type="email" onChange={e=>setEmail(e.target.value)} name="Email" required />
        </DivCenterInput>

        <Row>
          <CustomInputRow placeholder="Occupation" onChange={e=>setOccupation(e.target.value)} name="Occupation" required />

          {/* Phone */}
          <CustomInputRow
            type="number"
            placeholder="Mobile Number"
            name="Mobile"
            onChange={e=>setPhoneNumber(e.target.value)}
            required
          />
        </Row>
        <DivCenterInput>
          {/* Address */}
          <CustomInput type="text" placeholder="Address" onChange={e=>setAddress(e.target.value)} name="Address" required />
        </DivCenterInput>

        <Row>
          {/* Birthday */}
          <CustomInputRow placeholder="Birthday" type="date" onChange={e=>setDob(e.target.value)} name="Birthday" required />

          {/* State */}
          <CustomInputRow placeholder="State" onChange={e=>setState(e.target.value)} name="State" required />
        </Row>
        <Row>
          {/* Id type */}
          <CustomInputRow placeholder="Id Type" onChange={e=>setIdtype(e.target.value)} type="text" name="IdType" required />

          {/* Id number */}
          <CustomInputRow
            type="number"
            placeholder="Id Number"
            name="IdNumber"
            onChange={e=>setIdnumber(e.target.value)}
            required
          />
        </Row>

        <DivCenterInput>
          {/* Password */}
          <CustomInput type="password" onChange={e=>setPassword(e.target.value)} placeholder="Password" name="Password" required />
        </DivCenterInput>
        <br />
        <DivCenterInput>
          {/* confirm Password */}
          <CustomInput
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={e=>setConformPassword(e.target.value)}
            required
          />
        </DivCenterInput>

        {/* SUBMIT */}
        <br/>
        <DivCenterInput>
          <SubmitButton type="button" onClick={userRegister}>
            Register
            </SubmitButton>
        </DivCenterInput>
        </FormContainer>
      </RightContainer>
      <LeftContainer>
        <ImageBackground src={BankBackground} alt="Bank" />
      </LeftContainer>
    </Container>
  );
};
 
const Container = styled.div`
  margin: 0px;
  padding: 0px;
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: row;
`;


const RightContainer = styled.form`
  width: 50%;
  height: 100%;
  display: flex;
  padding-top: 20%;
  justify-content: center;
  align-items: center;

`;

const MainTitle = styled.h1`
  margin-top: 40px;
  color: #2980b9;
  text-align: center;
  font-size: 45px;
`;

const DivCenterInput = styled.div`
  display: flex;
  justify-content: center;
`;

const CustomInput = styled.input`
  width: 90%;
  padding: 10px;
  border: none;
  font-size: 16px;
  color: #444;

  &:focus {
    outline: none;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const CustomInputRow = styled.input`
  width: 40%;
  margin: 40px 0px;
  padding: 10px;
  border: none;
  font-size: 16px;
  color: #444;

  &:focus {
    outline: none;
  }
`;
const CustomSelect = styled.select`
  width: 40%;
  margin: 40px 0px;
  padding: 10px;
  border: none;
  font-size: 16px;
  color: #444;
  &:focus {
    outline: none;
  }
`;
const FormContainer = styled.form`
  width: 550px;
  height: 900px;
  border-radius: 50px;
  background-color: #f0f0f0;
`;


const SubmitButton = styled.button`
  padding: 10px 60px;
  font-size: 20px;
  border: none;
  background-color: #2980b9;
  color: white;
  border-radius: 5px;

  &:hover {
    background-color: #3188c1;
    cursor: pointer;
  }
`;
