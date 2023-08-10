import React, { useState,useEffect } from 'react';
import { MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBIcon, MDBInput, MDBBtn, MDBCardImage } from 'mdb-react-ui-kit';
import axios from 'axios';
function SignupForm() {
    const [name,setName] =  useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confPassword,setConfPassword] = useState('');

    async function register(){
        if(password == confPassword)
        {
            const user ={
                name,
                email,
                password,
                confPassword
            }
           try {
            const result = await axios.post('/api/users/register', user);
            const responseData = result.data; // Access the data property
            console.log(responseData);
            
           } catch (error) {
            console.log(error.response.data);
          }
        }
        else{
            alert("passwords don't match!")
        }
    }

  return (
    <MDBContainer className='d-flex justify-content-center align-items-center vh-100'>
      <MDBCard className='text-black' style={{ borderRadius: '25px', width: '70%' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='8' lg='5' className='order-2 order-lg-1 d-flex flex-column align-items-center mx-auto'>

              <p className="text-center h1 fw-bold mb-4 mt-3">Register!</p>

              <div className="d-flex flex-row align-items-center mb-3">
                <MDBIcon fas icon="user" size='lg' className='me-3' />
                <MDBInput label='Your Name' id='form1' type='text' className='w-100' 
                value={name} onChange={(e) => {setName(e.target.value)}} />
              </div>

              <div className="d-flex flex-row align-items-center mb-3">
                <MDBIcon fas icon="envelope" size='lg' className='me-3' />
                <MDBInput label='Your Email' id='form2' type='email'
                 value={email} onChange={(e) => {setEmail(e.target.value)}} />
              </div>

              <div className="d-flex flex-row align-items-center mb-3">
                <MDBIcon fas icon="lock" size='lg' className='me-3' />
                <MDBInput label='Password' id='form3' type='password'
                 value={password} onChange={(e) => {setPassword(e.target.value)}} />
              </div>

              <div className="d-flex flex-row align-items-center mb-3">
                <MDBIcon fas icon="key" size='lg' className='me-3' />
                <MDBInput label='Repeat your password' id='form4' type='password'
                 value={confPassword} onChange={(e) => {setConfPassword(e.target.value)}} />
              </div>

              <MDBBtn className='mb-3' size='md' onClick={register}>Register</MDBBtn>

            </MDBCol>

            <MDBCol md='8' lg='5' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default SignupForm;
