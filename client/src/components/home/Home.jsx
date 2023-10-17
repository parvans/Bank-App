import React, { useEffect, useState } from 'react'
import Videos from '../assets/space.mp4'
import './Home.css'
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom'
import adminimg from '../assets/admin.gif'

const Home = () => {
  const [logIn, setLogIn] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("UserToken")) {
      setLogIn(false);
    }
  }, []);

    const navigate=useNavigate()
    const getStart=()=>{
        navigate('/user/login')
    }
  return (
    <div className="hero" >
    <video autoPlay loop muted id="video" >
        <source src={Videos} type="video/mp4" />
     </video>
      <div className="admin" onClick={()=>navigate('/admin/login')}>
      <img className='admin' src={adminimg} alt="Admin" />
      </div>
     <div className="content" >
        <h1>ICICI Bank</h1>
        <h4>Thinking about recharge. Think ICICI Bank<br/></h4>
        { logIn && <Button variant="primary" size='lg' onClick={getStart}>Get Started</Button> }
     </div>
</div>
  )
}

export default Home