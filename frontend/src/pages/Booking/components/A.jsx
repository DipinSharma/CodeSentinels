import React, { useEffect, useState } from 'react'
import DoctorAvailabilityTable from './B';

function DoctorDetails() {
    const [doctors,setDoctors]=useState(null);

    const render=async()=>{
        let res=await fetch('http://localhost:5000/doctors/getAll',{
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        res=await res.json();
        setDoctors(res);
    }

    useEffect(()=>{
        render()
    },[])
    
  return (
    <div>
      <DoctorAvailabilityTable doctors={doctors} />;
    </div>
  )
}

export default DoctorDetails;