import React from 'react'
import { Link } from 'react-router-dom'

const Requests = () => {
  return (
    <div>
      <div>Requests</div>

<div>
  Pending Requests:
</div>
<button
className='flex flex-row justify-center items-center my-5 bg-[#29f2e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]'>
  <Link to="new">Add Request</Link>
</button>
    </div>
  )
}

export default Requests