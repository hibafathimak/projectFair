import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Profile from '../components/Profile'
import View from '../components/View'
import { tokenAuthContext } from '../contexts/AuthContextAPI'



const Dashboard = () => {
  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthContext)
  const [username,setUsername] =useState("")
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setIsAuthorized(true)
    }else{
      setIsAuthorized(false)
    }
    if(sessionStorage.getItem("user")){
      setUsername(JSON.parse(sessionStorage.getItem("user")).username.split(" ")[0])
    }else{
      setUsername("")
    }
  },[])
  return (
    <>
    <Header insideDashboard={true}/>
    <div style={{paddingTop:'150px'}} className='container-fluid'>
      <div className="row mt-3">
        <div className="col-lg-8 mb-2">
          <h1>Welcome <span className='text-tertiary'>{username}</span></h1>
          <View/>
        </div>
        <div className="col-lg-4 p-5">
          <Profile/>
        </div>
      </div>
      </div>
      </>
  )
}

export default Dashboard