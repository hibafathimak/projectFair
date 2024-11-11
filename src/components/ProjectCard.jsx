import React from 'react'
import { useState } from 'react';
import { Card, Modal } from 'react-bootstrap'
import SERVER_URL from '../services/serverUrl';


const ProjectCard = ({displayData}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
     <Card onClick={handleShow} className='bg-light p-3' style={{ width: '20rem' }}>
      <Card.Img height={'200px'} variant="top" className='img-fluid' src={`${SERVER_URL}/uploads/${displayData?.projectImg}`}  />
      <Card.Body className='text-center'>
        <Card.Title className='fw-bolder'>{displayData?.title}</Card.Title>
      </Card.Body>
    </Card>


    <Modal show={show} size='lg' centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="row">
          <div className="col-lg-6">
            <img className='img-fluid' src={`${SERVER_URL}/uploads/${displayData?.projectImg}`} alt="" />
          </div>
          <div className="col-lg-6">
            <h1>{displayData?.title}</h1>
            <h6 className='fw-bolder'>Languages Used : <span className='text-info'>{displayData?.languages}</span></h6>
            <p style={{textAlign:'justify'}}><span>Project Overview : </span>{displayData?.overview}</p>
          </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <a href={displayData?.github} className="btn btn-outline-info" target='_blank'><i className="fa-brands fa-github"></i></a>
          <a href={displayData?.website} className="btn btn-outline-info" target='_blank'><i className="fa-solid fa-link fa-sm"></i></a>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProjectCard