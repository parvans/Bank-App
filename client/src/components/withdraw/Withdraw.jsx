import React, { useState } from 'react'
import styled from 'styled-components';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";
import axios from 'axios';

export default function Withdraw() {
    const [token,setToken]=useState('')
    const[balance,setBalance]=useState(0)
    const [amount,setAmount]=useState(0)
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
}, [token, data])

const withDraw= async()=>{
    if(amount>0){
        if(amount<=balance){
            const amt=Number(amount)
            const reslt=balance-amt
            await axios({
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
                    text: 'Withdraw Successfull',
                    icon: 'success',
                })

            }).catch(err=>{
                console.log('====================================');
                console.log(err);
                console.log('====================================');
                Swal.fire({
                    title: 'Error',
                    text: 'Server Crashed',
                    icon: 'error',
                })
            })
        }else{
            Swal.fire({
                title: 'Error',
                text: 'Account Balance is low',
                icon: 'error',
            })
        }
    }else{
        Swal.fire({
            title: 'Error',
            text: 'Please Enter Valid Amount',
            icon: 'error',
        })
    }
}
  return (
    <div>
        <Container>
            <WithdrawBox>
            <WithdrawHeading>
            Withdraw
          </WithdrawHeading>
            <WithdrawBalance>
            Balance: {balance} ₹
            </WithdrawBalance>
            <WithdrawForm>
            <WithdrawInput type="number" placeholder='Enter Amount' onChange={(e)=>setAmount(e.target.value)} />
            <WithdrawButton type='button' onClick={withDraw}>Withdraw</WithdrawButton>
            </WithdrawForm>

            </WithdrawBox>
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
const WithdrawBox=styled.div`
  width: 400px;
  height: 500px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  `;
    const WithdrawHeading=styled.h1`
    font-size: 2.5rem;
    font-weight: 700;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
    `;
    const WithdrawForm=styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    `;
    const WithdrawInput=styled.input`
    width: 80%;
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
    const WithdrawButton=styled.button`
    width: 80%;
    height: 50px;
    background-color: #333;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 1.1rem;
    font-weight: 500;
    cursor: pointer;
    `;
    const WithdrawBalance=styled.p`
    font-size: 1.1rem;
    font-weight: 500;
    color: #333;
    text-align: center;

    `;
