import React, { useState } from 'react';

const DoctorAvailabilityTable = ({ doctors }) => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    const [specialty, setSpecialty] = useState('')

    const getSlotsForDay = (timeSlots, day) => {
        return timeSlots
            .filter(slot => slot.day === day)
            .map(slot => {
                const startTime = new Date(slot.start).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                const endTime = new Date(slot.end).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                return {
                    startTime,
                    endTime,
                    fullTimeString: `${startTime} - ${endTime}`,
                    start: slot.start,
                    end: slot.end,
                };
            });
    };

    const sendSlotToBack = async (slot) => {
        try {

            localStorage.setItem('doctorId', slot.doctorId);
            localStorage.setItem('startTime', slot.startTime);
            localStorage.setItem('endTime', slot.endTime);
            localStorage.setItem('day', slot.day);

            let res = await fetch('http://localhost:5000/bookedSlots', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slot }),
            });
            if (!res.ok) {
                console.error("Failed to send slot to backend");
            }
        } catch (error) {
            console.error("Error sending slot to backend:", error);
        }
    };

    const handleSlotClick = async (doctor, day, slotInfo) => {
        if (slotInfo) {
            const selectedSlot = {
                doctor: doctor.name,
                doctorId: doctor.id,
                day,
                startTime: slotInfo.start,
                endTime: slotInfo.end,
            };

            await sendSlotToBack(selectedSlot);
        }
    };

    return (
        <div>
            <div>
                Speciality=
                <select id='filter' onClick={(e) => { setSpecialty(e.target.value) }}>
                    <option key={'all'} value={''}>General</option>
                    <option key={'dermatology'} value={'dermatology'}>Dermatology</option>
                    <option key={'cardiology'} value={'cardiology'}>Cardiology</option>
                    <option key={'neurology'} value={'neurology'}>Neurology</option>
                    <option key={'pediatrics'} value={'pediatrics'}>Pediatrics</option>
                </select>
            </div>

            <table border="1" cellPadding="10" cellSpacing="0" className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Doctor Name</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Specialty</th>
                        {daysOfWeek.map(day => (
                            <th key={day} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {doctors && doctors.map(doctor => (
                        <tr key={doctor.id}>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{doctor.name}</td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{doctor.specialty}</td>
                            {daysOfWeek.map(day => (
                                <td key={day} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {getSlotsForDay(doctor.availability.timeSlots, day).map((slotInfo, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSlotClick(doctor, day, slotInfo)}
                                            className="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
                                        >
                                            <span className="absolute inset-0 border border-red-600 group-active:border-red-500"></span>
                                            <span
                                                className="block border border-red-600 bg-red-600 px-12 py-3 transition-transform active:border-red-500 active:bg-red-500 group-hover:-translate-x-1 group-hover:-translate-y-1"
                                            >
                                                {slotInfo.fullTimeString || 'N/A'}
                                            </span>
                                        </button>
                                    ))}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DoctorAvailabilityTable;