import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <div style={{ height: '300px',width:'100%'}} className=' pt-5 shadow mt-5 '>
      <div className="d-flex justify-content-evenly">
        <div style={{ width: "400px" }} className="intro">
          <Link style={{ textDecoration: "none", fontWeight: "600", fontSize: '20px' }} to={'/'}>
            <i class="fa-solid fa-laptop-code me-4"></i>
            Project Fair
          </Link>
          <p className='mt-3'>Quidem atque quasi, esse hic dolores recusandae pariatur aliquam rem sapiente dicta quia  libero.</p>
          <p>Code licensed MIT, docs CC BY 3.0.</p>
          <p>Currently v5.3.3.</p>
        </div>
        <div>
          <h2 style={{ fontWeight: "600", fontSize: "20px" }}>Links</h2>
          <Link style={{ textDecoration: "none" }} to={'/'}>
            Home
          </Link> <br />
          <Link style={{ textDecoration: "none" }} to={'/login'}>
            Login
          </Link><br />
          <Link style={{ textDecoration: "none" }} to={'/register'}>
            Register
          </Link>
        </div>
        <div>
          <h2 style={{ fontWeight: "600", fontSize: "20px" }}>Guides</h2>
          <Link style={{ textDecoration: "none" }} to={''}>
            React
          </Link> <br />
          <Link style={{ textDecoration: "none" }} to={''}>
            React Bootstrap
          </Link><br />
          <Link style={{ textDecoration: "none" }} to={''}>
            React Router
          </Link>
        </div>
        <div className="contact">
          <h2 style={{ fontWeight: "600", fontSize: "20px" }}>Contact Us</h2>
          <div className='d-flex'>
            <input type="text" placeholder='Enter your email here' className='rounded form-control text-center' />
            <button className='btn btn-info ms-4'>
              <i className="fa-solid fa-arrow-right "></i>
            </button>
          </div>
          <br />
          <div className='d-flex  justify-content-evenly mt-3'>
            <i class="fa-brands fa-twitter"></i>
            <i class="fa-brands fa-instagram"></i>
            <i class="fa-brands fa-linkedin"></i>
            <i class="fa-brands fa-github"></i>
            <i class="fa-solid fa-phone"></i>
          </div>

        </div>
      </div>
      <p className='text-center mt-3'>Copyright & copy ; June 2024 Batch, ProjectFair. Buildt with React. </p>
    </div>)
}

export default Footer