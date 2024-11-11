import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import landingImg from '../assets/coding.png'


import ProjectCard from '../components/ProjectCard'
import { Card } from 'react-bootstrap'
import { getHomeProjectsAPI } from '../services/allAPI'



const Home = () => {
  const [allHomeProjeects,setAllHomeProjects]=useState([])
  const navigate=useNavigate()
  const handleProject=()=>{
    if(sessionStorage.getItem("token")){
      navigate('/projects')
    }else{
      alert("Please login to get full access to our projects!!")
    }
  }
useEffect(()=>{
  getAllHomeProjects()
},[])
  const getAllHomeProjects =async()=>{
    try {
      const result = await getHomeProjectsAPI()
      if(result.status==200){
        setAllHomeProjects(result.data)
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  console.log(allHomeProjeects);
  


  return (
    <>
    <div style={{minHeight:'100vh'}} className="d-flex justify-content-center align-items-center rounded shadow w-100">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1  style={{fontSize:'80px'}}> <i class="fa-solid fa-laptop-code me-4"></i>Project Fair</h1>
            <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis eligendi laboriosam quo quasi aspernatur assumenda nam, ullam aliquam accusantium magnam doloremque odio corrupti repudiandae laborum distinctio obcaecati architecto maxime quia. <br/> Porro nisi, doloribus quaerat, cupiditate quia facilis dolorem a, iure dignissimos tempora eius quae animi dicta. Ducimus libero aperiam magni ipsam labore!</p>
            {
              sessionStorage.getItem("token")?
              <Link to={'/dashboard'} className='text-uppercase btn btn-outline-info px-3 py-2'>manage your projects</Link>
              :
            <Link to={'/login'} className='text-uppercase btn btn-outline-info px-3 py-2'>start to explore</Link>}

          </div>
          <div className="col-lg-6">
            <img className='img-fluid' src={landingImg} alt="" />
          </div>
        </div>
      </div>
    </div>
    <div className="mt-5 text-center">
      <h1 className="mb-5">Explore Our Projects</h1>
      <marquee>
        <div className="d-flex">
          { allHomeProjeects?.map(project=>(
            <div key={project._id} className="me-5">
            <ProjectCard displayData={project}/>
          </div>
          )) }
        </div>
      </marquee>
      <button onClick={handleProject} className='btn rounded-3 btn-info mt-5 text-uppercase p-3'>click here to view more projects</button>
    </div>
    <div className="d-flex justify-content-center align-items-center flex-column mt-5">
      <h1>Testimonials</h1>
      <div className="d-flex align-items-center justify-content-evenly w-100 mt-3">
      <Card className='bg-light' style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
          <img width={'60px'} height={'60px'} className='rounded-circle img-fluid mb-2' src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp" alt="" />
          <span>Sara</span>
          </Card.Title>
        <Card.Text>
          <div className="d-flex justify-content-center mb-2">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </div>
          <p style={{textAlign:'justify'}}> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima totam eaque officia veritatis amet inventore facere perferendis sunt distinctio enim</p>
        </Card.Text>
      </Card.Body>
    </Card>
    <Card className='bg-light' style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
          <img width={'60px'} height={'60px'} className='rounded-circle img-fluid mb-2' src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp" alt="" />
          <span>Ben</span>
          </Card.Title>
        <Card.Text>
          <div className="d-flex justify-content-center mb-2">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </div>
          <p style={{textAlign:'justify'}}> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima totam eaque officia veritatis amet inventore facere perferendis sunt distinctio enim</p>
        </Card.Text>
      </Card.Body>
    </Card>
    <Card className='bg-light' style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
          <img width={'60px'} height={'60px'} className='rounded-circle img-fluid mb-2' src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp" alt="" />
          <span>Anna</span>
          </Card.Title>
        <Card.Text>
          <div className="d-flex justify-content-center mb-2">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </div>
          <p style={{textAlign:'justify'}}> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima totam eaque officia veritatis amet inventore facere perferendis sunt distinctio enim</p>
        </Card.Text>
      </Card.Body>
    </Card>
      </div>
    </div>
    </>
  )
}

export default Home