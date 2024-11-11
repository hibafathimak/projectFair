import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { getAllProjectsAPI } from '../services/allAPI'

const Projects = () => {
  const [searchKey,setSearchKey]=useState("")
  const [allProjects,setAllProjects]=useState([])

  useEffect(()=>{
    getAllProjects()
  },[searchKey])

  const getAllProjects = async()=>{
    const token=sessionStorage.getItem("token")
    if(token){
      const reqHeader={
        "Authorization":`Bearer ${token}`
      }
      try {

        const result =await getAllProjectsAPI(searchKey,reqHeader)
        if(result.status==200){
          setAllProjects(result.data)
        }
      
      } catch (error) {
        console.log(error);
        
      }
    }
  }

  console.log(allProjects);
  
  return (
    <>
    <Header/>
    <div style={{paddingTop:'125px'}} className='container-fluid px-5'>
    <div className="d-flex justify-content-between">
      <h1>ALL PROJECTS</h1>
      <input onChange={e=>setSearchKey(e.target.value)} className='form-control w-25' type="text" placeholder='Search Projects by their Languages'/>
    </div>
    <Row className='mt-3'>
      {
        allProjects?.length>0?
        allProjects?.map(project=>(
      <Col key={project._id} className='mb-3' sm={12} md={6} lg={4}>
      <ProjectCard displayData={project}/>
      </Col>
        ))
        :
        <div className="text-danger fw-bolder">No Projects Found</div>
      }
    </Row>
    </div>
      </>
  )
}

export default Projects