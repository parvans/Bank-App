import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

function ChanagePassword() {
  const [token,setToken]=useState('')
const[password,setPassword]=useState('')
const[conformPassword,setConformPassword]=useState('')
const navigate=useNavigate();

var url="http://localhost:8000"
  useEffect(()=>{
      setToken( localStorage.getItem('UserToken'))
  }, [token])

  const changePassword=()=>{
    if(password!==conformPassword){
      Swal.fire({
        title: 'Error',
        text: 'Password not matching',
        icon: 'error',
      })
    }else{
      axios({
        method:'put',
        url:url+'/api/user/ChangePassword',
        data:{
          Password:password
        },
        headers:{
          accept:'application/json',
          token:token
        }
      }).then(res=>{
        console.log(res.data);
        if(res.data){
          Swal.fire({
            title: 'Success',
            text: 'Password Changed',
            icon: 'success',
          })
          navigate('/user/account')
        }
      }).catch(err=>{
        console.log(err);
        Swal.fire({
          title: 'Error',
          text: 'Something went wrong',
          icon: 'error',
        })
      })
    }
  }

  return (
    <div>
      <Container>
        <ChangePasswordBox>
          <ChangePasswordForm>
            <ChangePasswordHeading>Change Password</ChangePasswordHeading>
            <ChangePasswordInput type="password" onChange={e=>setPassword(e.target.value)} placeholder="New Password" required />
            <ChangePasswordInput type="password" onChange={e=>setConformPassword(e.target.value)} placeholder="Confirm Password" required />
            <ChangePasswordButton type="button" onClick={changePassword}>Change Password</ChangePasswordButton>
          </ChangePasswordForm>
        </ChangePasswordBox>
      </Container>
      </div>
  )
}

export default ChanagePassword

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;
const ChangePasswordBox = styled.div`
  width: 400px;
  height: 300px;
  background-color: #fff;
  border-radius: 10px;
`;
const ChangePasswordForm = styled.form`
  padding: 20px;
`;
const ChangePasswordHeading = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  `;
const ChangePasswordInput = styled.input`
  width: 100%;
  height: 50px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 5px;
  padding: 0 20px;
  margin-bottom: 20px;
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
`;

const ChangePasswordButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: #333;
  border: none;
  border-radius: 5px;
  color: #fff;
  `;
