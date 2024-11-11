import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { tokenAuthContext } from '../contexts/AuthContextAPI';


const Header = ({insideDashboard}) => {
  const {isAuthorized,setIsAuthorized}=useContext(tokenAuthContext)
  const navigate=useNavigate()
  const logout=()=>{
    sessionStorage.clear()
    setIsAuthorized(false)
    navigate('/')
  }
  return (
    <Navbar style={{zIndex:'100'}} className="bg-body-secondary shadow position-fixed w-100">
        <Container>
          <Navbar.Brand>
          <Link style={{ textDecoration: "none", fontWeight: "600", fontSize: '35px' }} to={'/'}>
            <i class="fa-solid fa-laptop-code me-4"></i>
            Project Fair
          </Link>
          </Navbar.Brand>
          {
            insideDashboard && 
            <div className="ms-auto">
              <button onClick={logout} className='btn py-2 px-4'>Log Out <i class="fa-solid fa-right-from-bracket"></i></button>
            </div>
          }
        </Container>
      </Navbar>
  )
}

export default Header