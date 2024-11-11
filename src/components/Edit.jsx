import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import uploadImg from '../assets/upload.png'
import SERVER_URL from '../services/serverUrl';
import { editProjectResponseContext } from '../contexts/ContextAPI';
import { updateProjectAPI } from '../services/allAPI';

const Edit = ({ project }) => {
  const {editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState("")
  const [imageFileStatus, setImageFileStatus] = useState(false)
  const [projectDetails, setProjectDetails] = useState({
    id: project._id, title: project.title, languages: project.languages, overview: project.overview, github: project.github, website: project.website, projectImg: ""
  })

  console.log(projectDetails);

  useEffect(() => {
    if (projectDetails.projectImg.type == "image/jpg" || projectDetails.projectImg.type == "image/jpeg" || projectDetails.projectImg.type == "image/png") {
      setImageFileStatus(true)
      setPreview(URL.createObjectURL(projectDetails.projectImg))

    } else {
      setImageFileStatus(false)
      setPreview("")
      setProjectDetails({ ...projectDetails, projectImg: "" })
    }
  }, [projectDetails.projectImg])

  const handleClose = () => {
    setShow(false);
    setProjectDetails({
      id: project._id, title: project.title, languages: project.languages, overview: project.overview, github: project.github, website: project.website, projectImg: ""
    })
  }
  const handleShow = () => {
    setShow(true);
    setProjectDetails({
      id: project._id, title: project.title, languages: project.languages, overview: project.overview, github: project.github, website: project.website, projectImg: ""
    })
  }

  const handleUpdateProject = async () => {
    const {id,title,languages,overview,github,website,projectImg}=projectDetails
    if(title && languages && overview && github && website){
      const reqBody=new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      preview? reqBody.append("projectImg",projectImg) :reqBody.append("projectImg",project.projectImg)
      const token=sessionStorage.getItem("token")
      if(token){
        const reqHeader={
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        try {
          const result = await updateProjectAPI(id,reqBody,reqHeader)
          if(result.status==200){
            alert("Project Details Updated Successfully")
            handleClose()
            setEditProjectResponse(result)
          }
        } catch (error) {
          console.log(error);
          
        }
      }

    }else{
      alert("Please fill the form completely")
    }
  }

  return (
    <>
      <button onClick={handleShow} className='btn py-1 px-3 me-3 rounded btn-warning' ><i className="fa-solid fa-edit"></i> Edit</button>
      <Modal
        size='lg'
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title className='fw-bolder'>New Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-4">
              <label>
                <input onChange={e => setProjectDetails({ ...projectDetails, projectImg: e.target.files[0] })} type="file" style={{ display: 'none' }} />
                <img src={preview ? preview : `${SERVER_URL}/uploads/${project.projectImg}`} className='img-fluid' height={'200px'} alt="" />
              </label>
              {!imageFileStatus && <div className="text-danger text-center fw-bolder my-2">* Upload only the following types (jpeg,jpg,png) here</div>
              }            </div>
            <div className="col-lg-8">
              <div className="mb-3">
                <input className='form-control p-2' value={projectDetails.title} onChange={e => setProjectDetails({ ...projectDetails, title: e.target.value })} type="text" placeholder='Project Title' />
              </div>
              <div className="mb-3">
                <input className='form-control p-2' value={projectDetails.languages} onChange={e => setProjectDetails({ ...projectDetails, languages: e.target.value })} type="text" placeholder='Languages used in Project' />
              </div>
              <div className="mb-3">
                <input className='form-control p-2' value={projectDetails.overview} onChange={e => setProjectDetails({ ...projectDetails, overview: e.target.value })} type="text" placeholder='Project Overview' />
              </div>
              <div className="mb-3">
                <input className='form-control p-2' value={projectDetails.github} onChange={e => setProjectDetails({ ...projectDetails, github: e.target.value })} type="text" placeholder='Project Github Link' />
              </div>
              <div className="mb-2">
                <input className='form-control p-2' value={projectDetails.website} onChange={e => setProjectDetails({ ...projectDetails, website: e.target.value })} type="text" placeholder='Project Website Link' />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className='rounded py-1 px-3 text-light bg-danger' onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdateProject} className='rounded py-1 px-3 text-light bg-info'>Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit