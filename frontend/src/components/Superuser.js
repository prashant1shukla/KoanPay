import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { MDBBtn } from 'mdb-react-ui-kit';

function Superuser() {
    let navigate = useNavigate();
  return (
    <div className='superuser_container'>
      <div className="superuser_subcontainer text-center">
        <div className='existing_bank_conatiner pt-5'>
          <h1>Display</h1>
          <h1>Existing</h1>
          <h1>Bank</h1>
          <h1>Details</h1>
        </div>
        {/* <button onClick={()=>{return navigate('/createbank')}} >Create New Bank</button> */}
        <MDBBtn className="w-10 btn-util my-5" onClick={()=>{return navigate('/createbank')}}>Create New Bank</MDBBtn>
      </div>
    </div>
  )
}

export default Superuser;