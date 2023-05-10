import React from 'react'
import { useNavigate } from 'react-router-dom'

function Superuser() {
    let navigate = useNavigate();
  return (
    <div className='superuser_container'>
        <div className='bank_conatiner'>

        </div>
        <button onClick={()=>{return navigate('/createbank')}} >Create New Bank</button>
    </div>
  )
}

export default Superuser