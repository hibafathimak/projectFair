import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import profileImg from "../assets/profileadd.jpg"
import SERVER_URL from "../services/serverUrl"
import { updateUserAPI } from '../services/allAPI'



const Profile = () => {
  const [preview, setPreview] = useState("")
  const [existingProfilePic, setExistingProfilePic] = useState("")
  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "", email: "", password: "", github: "", linkedin: "", profilePic: ""
  })

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      const user = JSON.parse(sessionStorage.getItem("user"))
      setUserDetails({ ...userDetails, username: user.username, email: user.email, password: user.password, github: user.github, linkedin: user.linkedin })
      setExistingProfilePic(user.profilePic)
    }
  }, [open])

  useEffect(() => {
    if (userDetails.profilePic) {
      setPreview(URL.createObjectURL(userDetails.profilePic))
    } else {
      setPreview("")
    }
  }, [userDetails.profilePic])

const handleProflieUpdate=async()=>{
   const {username, email ,password,github, linkedin, profilePic}=userDetails
   if(linkedin && github){
    const reqBody=new FormData()
    reqBody.append("username",username)
    reqBody.append("email",email)
    reqBody.append("password",password)
    reqBody.append("github",github)
    reqBody.append("linkedin",linkedin)
    preview?reqBody.append("profilePic",profilePic):reqBody.append("profilePic",existingProfilePic)

    const token=sessionStorage.getItem("token")
    if(token){
      const reqHeader={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      try {
        const result =await updateUserAPI(reqBody,reqHeader)
        if(result.status==200){
          alert("User profile updated successfully")
          sessionStorage.setItem("user",JSON.stringify(result.data))
          setOpen(!open)
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
      <div className="d-flex justify-content-evenly ">
        <h3 className='text-info fw-bolder'>Profile</h3>
        <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none' }} className="text-info fw-bolder"><i class="fa-solid fa-lg fa-angle-down"></i></button>
      </div>

      <Collapse in={open}>
        <div className='row align-items-center justify-content-center shadow rounded container-fluid p-2' id="example-collapse-text">
          <label className='text-center mb-3'>
            <input type="file" onChange={e => setUserDetails({ ...userDetails, profilePic: e.target.files[0] })} style={{ display: "none" }} />
            {
              existingProfilePic == "" ?
                <img width={'150px'} height={'150px'} style={{ borderRadius: '50%' }} src={preview?preview:profileImg} alt="" />
                :
                <img width={'150px'} height={'150px'} style={{ borderRadius: '50%' }} src={preview?preview:`${SERVER_URL}/uploads/${existingProfilePic}`} alt="" />

            }
          </label>
          <div className="mb-3 w-100">
            <input type="text" value={userDetails.github} onChange={e=>setUserDetails({...userDetails,github:e.target.value})} className="form-control" placeholder='GitHub Profile Link' />
          </div>
          <div className="mb-3 w-100">
            <input type="text" value={userDetails.linkedin} onChange={e=>setUserDetails({...userDetails,linkedin:e.target.value})} className="form-control" placeholder='LinkIn Profile Link' />
          </div>
          <div className='d-grid w-100 mb-2'>
            <button onClick={handleProflieUpdate} className='btn btn-warning rounded'>Update Profile</button>

          </div>        </div>
      </Collapse>
    </>
  )
}

export default Profile