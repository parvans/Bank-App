import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";
import styled from 'styled-components';

export default function Deposite() {
    const [token,setToken]=useState('')
    const[balance,setBalance]=useState(0)
    const [amount,setAmount]=useState(null)
    const [data,setData]=useState()
    const navigate=useNavigate()
    var url="http://localhost:8000"
    useEffect(()=>{
      setToken(localStorage.getItem('UserToken'))
      if(!localStorage.getItem('UserToken')){
        navigate('/')
      }
      if(token){
        axios({
          method:'get',
          url:url+'/api/user/profile',
          headers:{
            accept:'application/json',
            token:token
          }
        }).then(res=>{
          setData(res.data)
          if(data){
            setBalance(parseInt(data.Balance))
          }
        }).catch(err=>console.log(err))
      }
    },[token,data])
    console.log(balance);

    const dePosite=()=>{
      if(amount>0){
        const amt=Number(amount)
        const reslt=balance+amt
        axios({
          method:'put',
          url:url+'/api/user/update',
          data:{
            Balance:reslt
          },
          headers:{
            accept:'application/json',
            token:token
          }
        }).then(res=>{
          console.log(res.data);
          Swal.fire({
            title: 'Success',
            text: 'Deposite Successfull',
            icon: 'success',
          })
        }).catch(err=>{
          Swal.fire({
            title: 'Error',
            text: 'Deposite Failed',
            icon: 'error',
          })
        })
      }else{
        Swal.fire({
          title: 'Error',
          text: 'Enter Valid Amount',
          icon: 'error',
        })
      }
      setAmount('')
    }
  return (
    <div>
      <Container>
        <DepositeBox>
          <DepositeHeading>
            Deposite
          </DepositeHeading>
          <p><b>Balance:</b> {balance} ₹</p>
          <DepositeInputBox>
            <DepositeInput type='number' placeholder='Enter Amount' value={amount} onChange={(e)=>setAmount(e.target.value)}/>
          </DepositeInputBox>
          <DepositeButton onClick={dePosite}>
            Deposite
          </DepositeButton>
        </DepositeBox>
      </Container>
    </div>
  )
}
const Container=styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  height:100vh;
  background-color:#f5f5f5;
`;
const DepositeBox=styled.div`
  width:400px;
  height:400px;
  background-color:#fff;
  border-radius:10px;
  box-shadow:0 0 10px 0 rgba(0,0,0,0.2);
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  `;
const DepositeHeading=styled.div`
  font-size:30px;
  font-weight:600;
  color:#000;
  margin-bottom:20px;
`;
const DepositeInputBox=styled.div`
  width:100%;
  height:50px;
  display:flex;
  justify-content:center;
  align-items:center;
  margin-bottom:20px;
`;
const DepositeInput=styled.input`
  width:80%;
  height:100%;
  border:1px solid #000;
  border-radius:5px;
  padding:0 10px;
  outline:none;
  font-size:18px;
  font-weight:500;
  color:#000;
`;
const DepositeButton=styled.button`
  width:80%;
  height:50px;
  border:none;
  border-radius:5px;
  background-color:#000;
  color:#fff;
  font-size:18px;
  font-weight:600;
  cursor:pointer;
  outline:none;
`;



