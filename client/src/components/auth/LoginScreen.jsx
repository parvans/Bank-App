import React from "react";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import BankBackground from "../assets/bankBackground.jpeg";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { auth } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  
} from "firebase/auth";
export const LoginScreen = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  var url = "http://localhost:8000";
  useEffect(() => {
    if (localStorage.getItem("UserToken")) {
      navigate("/user/Profile");
    }
  });

  const userLog = async () => {
    await axios.post(url+"/api/user/login", {
        Email: email,
        Password: password,
      }).then((res) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          signInWithEmailAndPassword(auth, email, password).catch((error) => {
            console.log(error.message);
          });
        }).catch((error)=>{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
          })
        })
        // console.log(res);
        if (res.data) {
          localStorage.setItem("UserToken", res.data);
          Swal.fire({
            icon: "success",
            title: "Login Success",
          });
          navigate("/user/account");
        }
      })
      .catch((err) => {
        console.log(err.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email & Password not matching",
        });
      });
  };

  return (
    <Container>
      <RightContainer>
        <FormContainer>
          <MainTitle>Login</MainTitle>
          <InputContainer>
            {/* <Icon className="far fa-id-card"></Icon> */}
            <CustomInput
              type="email"
              name="Email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            ></CustomInput>
          </InputContainer>

          <InputContainer>
            {/* <Icon className="fas fa-lock"></Icon> */}
            <CustomInput
              type="password"
              name="pass"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            ></CustomInput>
          </InputContainer>

          <InputContainer>
            <SubmitButton type="button" onClick={userLog}>
              Login
            </SubmitButton>
          </InputContainer>

          <InputContainer>
            <ForgotPassword to="/user/register">
              Don't you have an account?
            </ForgotPassword>
          </InputContainer>
        </FormContainer>
      </RightContainer>
      <LeftContainer>
        <ImageBackground src={BankBackground} alt="Bank" />
      </LeftContainer>
    </Container>
  );
};

export const Container = styled.div`
  margin: 0px;
  padding: 0px;
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: row;
`;

const RightContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LeftContainer = styled.div`
  width: 50%;
  height: 100%;
`;

export const ImageBackground = styled.img`
  width: 100%;
  height: 100%;
  position: fixed;
`;

const FormContainer = styled.form`
  width: 550px;
  height: 600px;
  border-radius: 50px;
  background-color: #f0f0f0;
`;

const MainTitle = styled.h1`
  margin-top: 50px;
  margin-bottom: 20px;
  color: #2980b9;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 43px;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CustomInput = styled.input`
  padding: 25px;
  padding-left: 5px;
  width: 57%;
  margin: 20px 0px;
  border: none;
  color: #444;
  font-size: 15px;

  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 20px 50px;
  width: 40%;
  border: none;
  background-color: #2980b9;
  border-radius: 30px;
  color: white;
  font-size: 20px;

  &:hover {
    background-color: #3188c1;
    cursor: pointer;
  }
`;

const ForgotPassword = styled(Link)`
  color: #2980b9;
  text-decoration: none;
  margin-top: 40px;
  font-size: 18px;
  font-family: Arial, Helvetica, sans-serif;
`;
