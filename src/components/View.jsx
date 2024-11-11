import React, { useContext, useEffect, useState } from 'react'
import Add from '../components/Add'
import Edit from '../components/Edit'
import { getUserProjectsAPI, removeProjectAPI } from '../services/allAPI'

import { addProjectResponseContext, editProjectResponseContext } from '../contexts/ContextAPI';



const View = () => {
  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
  const {editProjectResponse,setEditProjectResponse} =useContext(editProjectResponseContext)
  const [userProjects,setUserProjects] =useState([])
  useEffect(()=>{getUserProjects()},[addProjectResponse,editProjectResponse])
  const getUserProjects=async()=> {
    const token=sessionStorage.getItem("token")
    if (token){
      const reqHeader={
        "Authorization":`Bearer ${token}`
      }
      try {
        const result = await getUserProjectsAPI(reqHeader)
        if(result.status==200){
          setUserProjects(result.data)
        }
        
      } catch (error) {
        console.log(error);
        
      }
    }
  }

  console.log(userProjects);

  const handleRemoveProject=async(id)=>{
    const token =sessionStorage.getItem("token")
    if(token){
      const reqHeader={
        "Authorization":`Bearer ${token}`
      }
      try {

        await removeProjectAPI(id,reqHeader)
        getUserProjects()

      }catch(err){
        console.log(err);
        
      }
    }
  }

  
  return (
    <>
    <div className="d-flex justify-content-between my-3">
      <h2 className="text-danger">All Projects</h2>
      <div><Add/></div>
    </div>
      <div style={{border:'solid 1px',borderRadius:'10px'}} className="mt-2 px-3 bg-light pt-3 allProjects">
        {userProjects?.length>0? 
        userProjects?.map(project=>(
          <div className="w-100 rounded bg-secondary p-3 d-flex justify-content-between mb-3">
          <h3>{project?.title}</h3>
          <div className="d-flex align-items-center">
            <div> <Edit project={project}/> </div>
            <div className="btn py-1 px-3 rounded me-3 btn-outline-info"> <a target='_blank' href={project?.github}><i className="fa-brands text-light fa-github"></i></a></div>
            <button onClick={()=>handleRemoveProject(project?._id)} className='btn py-1 px-3 rounded btn-outline-danger'><i className="fa-solid fa-trash"></i></button>
          </div>
          </div>
        ))
       
        :
        <div className="text-danger">no projects added</div>  
        }
        </div>
    </>
  )
}

export default View