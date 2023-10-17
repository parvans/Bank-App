import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import BankBackground from "../assets/bankBackground.jpeg";

function ProfileUpdate() {
  const [token, setToken] = useState("");
  const [name, setName] = useState();
  const [dob, setDob] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [Occupation, setOccupation] = useState();
  const [idtype, setIdtype] = useState();
  const [idNumber, setIdnumber] = useState();
  const [address, setAddress] = useState();
  const [state, setState] = useState();
  const navigate = useNavigate();
  var url = "http://localhost:8000";
  useEffect(() => {
    setToken(localStorage.getItem("UserToken"));
    if (!localStorage.getItem("UserToken")) {
      navigate("/");
    }
    if (token) {
      axios({
        method: "get",
        url: url+"/api/user/profile",
        headers: {
          accept: "application/json",
          token: token,
        },
      })
        .then((res) => {
          setName(res.data.Name);
          setDob(res.data.Dob);
          setPhoneNumber(res.data.PhoneNumber);
          setOccupation(res.data.Occupation);
          setIdtype(res.data.idtype);
          setIdnumber(res.data.idNumber);
          setAddress(res.data.Address);
          setState(res.data.State);
        })
        .catch((err) => console.log(err));
    }
  }, [token]);

  const updateProfile = () => {
    axios({
        method: "put",
        url: url + "/api/user/update",
        data:{
            Name:name,
            Dob:dob,
            PhoneNumber:phoneNumber,
            Occupation:Occupation,
            idtype:idtype,
            idNumber:idNumber,
            Address:address,
            State:state
        },
        headers: {
            accept: "application/json",
            token: token,
        }
    }).then(res=>{
        if(res.data){
            Swal.fire({
                title: "Success",
                text: "Profile Updated",
                icon: "success",
            })
            navigate("/user/account")
        }
    }).catch(err=>{
        console.log(err);
        Swal.fire({
            title: "Error",
            text: "Profile Not Updated",
            icon: "error",
        })
    })
  }

  return (
    <div>
      <Container>
        <RightContainer>
          <FormContainer>
            <MainTitle>Update</MainTitle>
            <DivCenterInput>
              {/* Fulltname */}
              <CustomInput placeholder="Full Name" name="Fullname" value={name} onChange={e=>setName(e.target.value)} />
            </DivCenterInput>

            <Row>
              <CustomInputRow placeholder="Occupation" name="Occupation" value={Occupation} onChange={e=>setOccupation(e.target.value)} />

              {/* Phone */}
              <CustomInputRow
                type="number"
                placeholder="Mobile Number"
                name="Mobile"
                value={phoneNumber}
                onChange={e=>setPhoneNumber(e.target.value)}
              />
            </Row>
            <DivCenterInput>
              {/* Address */}
              <CustomInput type="text" placeholder="Address" value={address} onChange={e=>setAddress(e.target.value)} name="Address" />
            </DivCenterInput>

            <Row>
              {/* Birthday */}
              <CustomInputRow
                placeholder="Birthday"
                type="date"
                name="Birthday"
                value={dob}
                onChange={e=>setDob(e.target.value)}
              />

              {/* State */}
              <CustomInputRow placeholder="State" name="State" value={state} onChange={e=>setState(e.target.value)} />
            </Row>
            <Row>
              {/* Id type */}
              <CustomInputRow placeholder="Id Type" type="text" name="IdType" value={idtype} onChange={e=>setIdtype(e.target.value)} />

              {/* Id number */}
              <CustomInputRow
                type="number"
                placeholder="Id Number"
                name="IdNumber"
                value={idNumber}
                onChange={e=>setIdnumber(e.target.value)}
              />
            </Row>

            {/* SUBMIT */}
            <DivCenterInput>
              <SubmitButton type="button" onClick={updateProfile}>
                Update
                </SubmitButton>
            </DivCenterInput>
          </FormContainer>
        </RightContainer>
        <LeftContainer>
          <ImageBackground src={BankBackground} alt="Bank" />
        </LeftContainer>
      </Container>
    </div>
  );
}

export default ProfileUpdate;

const Container = styled.div`
  margin: 0px;
  padding: 0px;
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: row;
`;
const ImageBackground = styled.img`
  width: 100%;
  height: 100%;
  position: fixed;
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
const FormContainer = styled.form`
  width: 550px;
  height: 650px;
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
const LeftContainer = styled.div`
  width: 50%;
  height: 100%;
`;
