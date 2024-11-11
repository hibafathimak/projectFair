import React, { useContext, useEffect, useState } from 'react'
import uploadImg from '../assets/upload.png'
import { Button, Modal } from 'react-bootstrap'
import { addProjectAPI } from '../services/allAPI';
import { addProjectResponseContext } from '../contexts/ContextAPI';


const Add = () => {
  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
  const [show, setShow] = useState(false);
  const [preview,setPreview]=useState("")
  const [imageFileStatus,setImageFileStatus]=useState(false)
  const [projectDetails,setProjectDetails]=useState({
    title:"",languages:"",overview:"",github:"",website:"",projectImg:""
  })
  console.log(projectDetails);

  useEffect(()=>{
  if(projectDetails.projectImg.type=="image/jpg" || projectDetails.projectImg.type=="image/jpeg" || projectDetails.projectImg.type=="image/png"){
    setImageFileStatus(true)
    setPreview(URL.createObjectURL(projectDetails.projectImg))

  }else{
    setImageFileStatus(false)
    setPreview("")
    setProjectDetails({...projectDetails,projectImg:""})
  }
},[projectDetails.projectImg])

const handleAddProject=async()=>{
  const {title,languages,overview,github,website,projectImg} =projectDetails
  if(title && languages && overview && github && website && projectImg){
    // alert("call api")
    const reqBody=new FormData()
    reqBody.append("title",title)
    reqBody.append("languages",languages)
    reqBody.append("overview",overview)
    reqBody.append("github",github)
    reqBody.append("website",website)
    reqBody.append("projectImg",projectImg)

    const token=sessionStorage.getItem("token")
    if(token){
      const reqHeader={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      //make api call
      try {
        const result = await addProjectAPI(reqBody,reqHeader)
        if(result.status==200){
          alert("Project added successfully!!!")
          setAddProjectResponse(result)
          handleClose()
        }else{
          alert(result.response.data)
        }
      } catch (error) {
        console.log(error);
        
      }
    }

  }else{
    alert("Please Fill The Form Completely!!")
  }
}
  
  const handleClose = () => {
    setShow(false)
    setPreview("")
    setImageFileStatus(false)
setProjectDetails({title:"",languages:"",overview:"",github:"",website:"",projectImg:""})
    };
  const handleShow = () => setShow(true);
  return (
    <>
      <button onClick={handleShow} className="btn btn-info py-2 px-3"><i class="fa-solid fa-plus"></i> New Project</button>
      <Modal
        size='lg'
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title className='fw-bolder'>Update Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-4">
                <label>
                  <input onChange={e=>setProjectDetails({...projectDetails,projectImg:e.target.files[0]})} type="file" style={{display:'none'}} />
                  <img src={preview?preview:uploadImg} className='img-fluid' height={'200px'} alt="" />
                </label>
{ !imageFileStatus && <div className="text-danger text-center fw-bolder my-2">* Upload only the following types (jpeg,jpg,png) here</div>
}            </div>
            <div className="col-lg-8">
                <div className="mb-3">
                  <input className='form-control p-2' value={projectDetails.title} onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})} type="text" placeholder='Project Title' />
                </div>
                <div className="mb-3">
                  <input className='form-control p-2' value={projectDetails.languages} onChange={e=>setProjectDetails({...projectDetails,languages:e.target.value})} type="text" placeholder='Languages used in Project' />
                </div>
                <div className="mb-3">
                  <input className='form-control p-2' value={projectDetails.overview} onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})} type="text" placeholder='Project Overview' />
                </div>
                <div className="mb-3">
                  <input className='form-control p-2' value={projectDetails.github} onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})} type="text" placeholder='Project Github Link' />
                </div>
                <div className="mb-2">
                  <input className='form-control p-2'value={projectDetails.website} onChange={e=>setProjectDetails({...projectDetails,website:e.target.value})} type="text" placeholder='Project Website Link' />
                </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className='rounded py-1 px-3 text-light bg-danger' onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAddProject} className='rounded py-1 px-3 text-light bg-info'>Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add