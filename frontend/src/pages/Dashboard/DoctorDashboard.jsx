import React, { useEffect, useState } from 'react';

function PatientDetails() {
  const [data, setData] = useState(null);
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const render = async () => {
    let res = await fetch('http://localhost:5000/details/getPatientSessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        docId: localStorage.getItem('doctor').user._id,  // Fix for retrieving the doctor ID
        // docId:'66b3c16bdf8014db822be7a0',
    }),
    });
    res = await res.json();
    setData(res);
  };

  useEffect(() => {
    render();
  }, []);

  const getSlotsForDay = (slots, day) => {
    return slots
      .filter(slot => slot.day === day)
      .map(slot => {
        const startTime = new Date(slot.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const endTime = new Date(slot.endTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        return `${startTime} - ${endTime}`;
      }).join(', ');
  };

  return (
    <div>
      {data ? (
        <table border="1" cellPadding="10" cellSpacing="0" className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Patient Name</th>
              {daysOfWeek.map(day => (
                <th key={day} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{item.userName}</td>
                {daysOfWeek.map(day => (
                  <td key={day} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {getSlotsForDay(data, day) || 'N/A'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PatientDetails;