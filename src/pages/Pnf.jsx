import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

const Pnf = () => {
  return (
   <>
        <Header/>
        <div style={{paddingTop:'100px'}} className='flex justify-center items-center  flex-col'>
        <img width={'100%'} src="https://admiral.digital/wp-content/uploads/2023/08/404_page-not-found.png" alt="" />
        </div>
   </>
  )
}

export default Pnf