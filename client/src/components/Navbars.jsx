import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import logoimg from './assets/icic.png'
import Button from 'react-bootstrap/Button';

function Navbars() {
  const [logIn, setLogIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("UserToken")) {
      setLogIn(true);
    }
  }, []);

  const navigate = useNavigate();
  const logOut= () => {
    localStorage.clear();
    navigate('/')
    window.location.reload();
  }
  
  return (
    <>
      <Navbar expand="lg" bg="light" variant="light" fixed='top'>
        <Container fluid>
          <Navbar.Brand href="/">
          <img
              src={logoimg}
              width="100"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Nav.Link href="/" active>Home</Nav.Link>
            <Nav.Link href="/user/withdraw">Withdraw</Nav.Link>
            <Nav.Link href="/user/deposite">Deposit</Nav.Link>
            <Nav.Link href="/user/account" >Account</Nav.Link>
            { logIn && <Button variant="danger"  onClick={logOut}>Logout</Button>}
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbars;