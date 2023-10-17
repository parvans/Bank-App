import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

export default function AdminRegister() {
    const [name,setName]=useState()
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    var url="http://localhost:8000"
    const navigate=useNavigate();
    const adminRegister=()=>{
        axios.post(url+'/api/admin/Register',{
            Name:name,
            Email:email,
            Password:password
        },[])
        .then(res=>{
            console.log(res);
            if(res.data){
                localStorage.setItem('Admin',res.data)
                setTimeout(()=>{
                    navigate('/admin/users')
                },1000)
                Swal.fire({
                    title: 'Success',
                    text: 'Register Successfull',
                    icon: 'success',
                })
            }
        }).catch(err=>{
            console.log(err.message);
            Swal.fire({
                title: 'Error',
                text: 'Register Failed',
                icon: 'error',
            })
        })
    }
  return (
    <div>
        <Container>
        <AdminBox>
            <AdminHeading>Admin Register</AdminHeading>
            <AdminInputBox>
                <AdminInput type="text" placeholder="Name" onChange={e=>setName(e.target.value)} required />
            </AdminInputBox>
            <AdminInputBox>
                <AdminInput type="email" placeholder="Email Address" onChange={e=>setEmail(e.target.value)} required />
            </AdminInputBox>
            <AdminInputBox>
                <AdminInput type="password" placeholder="Password"onChange={e=>setPassword(e.target.value)} required />
            </AdminInputBox>
            <AdminButton type="button" onClick={adminRegister}>Register</AdminButton>
        </AdminBox>
        </Container>
    </div>
  )
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;
const AdminBox = styled.div`
    width: 400px;
    height: 400px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const AdminHeading = styled.div`
    font-size: 30px;
    font-weight: 600;
    color: #000;
    margin-bottom: 20px;
`;
const AdminInputBox = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;
const AdminInput = styled.input`
    width: 80%;
    height: 100%;
    border: 1px solid #000;
    border-radius: 5px;
`;  
const AdminButton = styled.button`
    width: 80%;
    height: 50px;
    border: 1px solid #000;
    border-radius: 5px;
    background-color: #000;
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
`;

