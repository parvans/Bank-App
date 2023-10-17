import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserImage from '../assets/default-user-image.png';
import Button from 'react-bootstrap/Button';

export const AcountInfoScreen = () => {
	const [data,setData] = useState([])
    const [Usertoken,setToken]= useState();
    const navigate=useNavigate();
    var url="http://localhost:8000"
	useEffect(()=>{
		if(! localStorage.getItem("UserToken")){
			navigate('/')
		}else{
			setToken(localStorage.getItem("UserToken"))
			axios({
				method: 'get',
				url: url+'/api/user/profile',
				headers: {
					accept: 'application/json',
					token: Usertoken
				}
			}).then(res=>{
				setData(res.data)
			}).catch(err=>console.log(err))
		}
	},[Usertoken,data,navigate])

	return (
		<div>
			<Container>
				<UserInfoBox>
					{/* Col 1 */}
					<ImageUserContainer>
						<UserImageTag src={UserImage} alt='image' />
					</ImageUserContainer>

					{/* Col 2 */}
					<InfoContainer>
						<Paragraph>
							Name : {data.Name}
						</Paragraph>
						<Paragraph>
							Email : {data.Email}
						</Paragraph>
						<Paragraph>
							ID type : {data.idtype}
						</Paragraph>
						<Paragraph>
							ID Number : {data.idNumber}
						</Paragraph>
						<Paragraph>
							Occupation : {data.Occupation}
						</Paragraph>
					</InfoContainer>
					
					{/* Col 3 */}
					<InfoContainer>

						<Paragraph>
							Birthday : {data.Dob}
						</Paragraph>
						<Paragraph>
							Gender : {data.Gender}
						</Paragraph>
						<Paragraph>
							Phone :  {data.PhoneNumber}
						</Paragraph>
						<Paragraph>
							Balance : {data.Balance} ₹
						</Paragraph>
						<Paragraph>
							Address : {data.Address}
						</Paragraph>
						<Paragraph>
							State : {data.State}
						</Paragraph>

						{/* <Paragraph style={{color:'transparent'}}>a</Paragraph> */}
					</InfoContainer>
					<UpdateContainer>
					<Button variant="outline-info"  onClick={()=>navigate('/user/profileupdate')}>✏️Update</Button>
					<Button variant="outline-info"  onClick={()=>navigate('/user/changepassword')}>🔑Change Password</Button>
					</UpdateContainer>
				</UserInfoBox>
			</Container>
		</div>
	)
}

 const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: auto;
	padding-top: 100px;
	height: auto !important;
`;

const UpdateContainer = styled.div`
	margin-left:110px;
	margin-top: 10px;
`;

const UserInfoBox = styled.div`
	width: 70%;
	height: 75%;
	background: rgb(41,128,185);
	background: linear-gradient(90deg, rgba(41,128,185,1) 0%, rgba(41,56,185,1) 35%, rgba(41,185,166,1) 100%);
	border-radius: 70px;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;

`;

const ImageUserContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const UserImageTag = styled.img`
	width: 300px;
	height: 300px;
	border-radius: 999px;
`;

const InfoContainer = styled.div`
	display: grid;
	align-items: center;
`;

const Paragraph = styled.p`
	color: white;
	margin: 0px 0px;
	font-size: 20px;
`;
