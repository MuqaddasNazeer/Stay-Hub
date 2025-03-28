import React, { useState } from 'react';
import { MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBIcon, MDBInput, MDBBtn, MDBCardImage } from 'mdb-react-ui-kit';
import axios from 'axios';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import { useHistory } from 'react-router-dom'; // Import useHistory

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory(); // Get history object

  async function login() {
    const user = {
      email,
      password,
    }

    try {
      setLoading(true);
      const result = await axios.post('/api/users/login', user);
      setLoading(false);
      localStorage.setItem('currentUser', JSON.stringify(result.data));
      history.push('/home'); // Redirect to the home screen
      console.log(result);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  }

  return (
    <div>
      {loading && <Loading />}
      <MDBContainer className='d-flex justify-content-center align-items-center vh-100'>
        <MDBCard className='text-black' style={{ borderRadius: '25px', width: '70%' }}>
          {error && <Error message='invalid credentials' />}
          <MDBCardBody>
            <MDBRow>
              <MDBCol md='8' lg='5' className='order-2 order-lg-1 d-flex flex-column align-items-center mx-auto'>
                <p className="text-center h1 fw-bold mb-4 mt-3">Login</p>
                <div className="d-flex flex-row align-items-center mb-3">
                  <MDBIcon fas icon="envelope" size='lg' className='me-3' />
                  <MDBInput label='Your Email' id='form2' type='email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div className="d-flex flex-row align-items-center mb-3">
                  <MDBIcon fas icon="lock" size='lg' className='me-3' />
                  <MDBInput label='Password' id='form3' type='password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <MDBBtn className='mb-3' size='md' onClick={login}>Login</MDBBtn>
              </MDBCol>
              <MDBCol md='8' lg='5' className='order-1 order-lg-2 d-flex align-items-center'>
                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default SignInForm;