import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';

function Room(props) {
  const { imageUrls, name, maxMemberCount, phoneNumber, type, rate, description } = props.room;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='row bs'>
      <div className='col-md-4'>
        {imageUrls?.[0] ? (
          <img src={imageUrls[0]} className='smalling' alt='Room Image' />
        ) : (
          <p>No images available</p>
        )}
      </div>
      <div className='col-md-7 text-left'>
        <h1>{name}</h1>
        <b>
          <p>Max Members: {maxMemberCount}</p>
          <p>Contact: {phoneNumber}</p>
          <p>Type: {type}</p>
          <p>Rating: {rate}</p>
        </b>
        <div style={{ float: 'right' }}>
          <Link to={`/book/${props.room._id}`}>
            <button className='btn btn-primary m-2'>Book Now</button>
          </Link>
          <button className='btn btn-primary' onClick={handleShow}>View Details</button>
        </div>

        <Modal show={show} onHide={handleClose} size='lg'>
          <Modal.Header closeButton>
            <Modal.Title>{name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Carousel>
              {imageUrls.map((url, index) => (
                <Carousel.Item key={index}>
                  <img className='d-block w-100 bigImage' src={url} alt={`Room ${index + 1}`} />
                </Carousel.Item>
              ))}
            </Carousel>
            <p>{description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Room;
