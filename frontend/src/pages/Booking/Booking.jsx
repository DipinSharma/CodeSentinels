import React, { useState, useEffect } from 'react';
import Navbar from '../../shared/components/Navbar';
import Footer from '../../shared/components/Footer';
import axios from 'axios';
import Payment from '../payement/components/Payment';

// Utility function to get the next 7 days starting from today
const getNext7Days = () => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const today = new Date();
  const days = [];
  
  for (let i = 0; i < 7; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() + i);
    days.push(daysOfWeek[day.getDay()]);
  }
  
  return days;
};

const Booking = () => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [specialties, setSpecialties] = useState(["Pediatrician", "Dermatologist", "Cardiologist", "Bones"]);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [userId, setUserId] = useState(null);
  const [docId, setDocId] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [day, setDay] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const getData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_DOCTORS);
      setRecords(response.data);
    } catch (e) {
      console.log("server side issue");
    }
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      console.log(JSON.parse(localStorage.getItem('user')))
      setUserId(JSON.parse(localStorage.getItem('user')).user._id)
    }
    getData();
  }, []);

  useEffect(() => {
    const data = records.filter(record =>
      selectedSpecialties.length === 0 || selectedSpecialties.includes(record.specialty)
    );
    setFilteredRecords(data);
  }, [records, selectedSpecialties]);

  // Calculate dynamic days array
  const days = getNext7Days();

  const handleSpecialtyChange = (event) => {
    const { value, checked } = event.target;
    setSelectedSpecialties((prev) =>
      checked
        ? [...prev, value]
        : prev.filter((specialty) => specialty !== value)
    );
  };

  // Function to handle button click
  const handleButtonClick = (start, end, doctorName,index) => {
    setDocId(doctorName);
    setStartTime(start);
    setEndTime(end)
    setDay(daysOfWeek[index]);
    console.log(`Doctor: ${doctorName}`);
    console.log(`Start Time: ${new Date(start).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`);
    console.log(`End Time: ${new Date(end).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`);
    console.log(daysOfWeek[index])
  };

  return (
    <>
      <Navbar />
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Book Appointments Now</h2>
            <p className="mt-4 max-w-md text-gray-500">
              Easily schedule consultations with our secure and user-friendly appointment booking system.
            </p>
          </header>

          {/* Mobile Filter Button */}
          <div className="mt-8 block lg:hidden">
            <button
              onClick={() => document.getElementById('mobile-filters').classList.toggle('hidden')}
              className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
            >
              <span className="text-sm font-medium"> Filters & Sorting </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4 rtl:rotate-180"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Mobile Filters */}
          <div id="mobile-filters" className="hidden lg:hidden mt-4 mb-8">
            <p className="block text-xs font-medium text-gray-700">Filters</p>
            <div className="space-y-2">
              <details className="overflow-hidden rounded border border-gray-300">
                <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                  <span className="text-sm font-medium"> Specialty </span>
                  <span className="transition group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <div className="border-t border-gray-200 bg-white">
                  <header className="flex items-center justify-between p-4">
                    <span className="text-sm text-gray-700">{selectedSpecialties.length} Selected</span>
                    <button
                      type="button"
                      className="text-sm text-gray-900 underline underline-offset-4"
                      onClick={() => setSelectedSpecialties([])}
                    >
                      Reset
                    </button>
                  </header>
                  <ul className="space-y-1 border-t border-gray-200 p-4">
                    {specialties.map((element, index) => (
                      <li key={index}>
                        <label htmlFor={`Filter${element.replace(/\s+/g, '')}`} className="inline-flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`Filter${element.replace(/\s+/g, '')}`}
                            value={element}
                            checked={selectedSpecialties.includes(element)}
                            onChange={handleSpecialtyChange}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <span className="text-sm font-medium text-gray-700">
                            {element}
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </div>
          </div>

          <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
            <div className="hidden space-y-4 lg:block">
              <div>
                <p className="block text-xs font-medium text-gray-700">Filters</p>
                <div className="mt-1 space-y-2">
                  <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                      <span className="text-sm font-medium"> Specialty </span>
                      <span className="transition group-open:-rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </span>
                    </summary>
                    <div className="border-t border-gray-200 bg-white">
                      <header className="flex items-center justify-between p-4">
                        <span className="text-sm text-gray-700">{selectedSpecialties.length} Selected</span>
                        <button
                          type="button"
                          className="text-sm text-gray-900 underline underline-offset-4"
                          onClick={() => setSelectedSpecialties([])}
                        >
                          Reset
                        </button>
                      </header>
                      <ul className="space-y-1 border-t border-gray-200 p-4">
                        {specialties.map((element, index) => (
                          <li key={index}>
                            <label htmlFor={`Filter${element.replace(/\s+/g, '')}`} className="inline-flex items-center gap-2">
                              <input
                                type="checkbox"
                                id={`Filter${element.replace(/\s+/g, '')}`}
                                value={element}
                                checked={selectedSpecialties.includes(element)}
                                onChange={handleSpecialtyChange}
                                className="h-4 w-4 rounded border-gray-300"
                              />
                              <span className="text-sm font-medium text-gray-700">
                                {element}
                              </span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>
                </div>
              </div>
            </div>

            <div className="col-span-3 w-full border border-gray-200">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr>
                      <th className="lg:sticky md:sticky left-0 z-10 whitespace-nowrap px-6 py-3 font-medium text-gray-900 bg-white">
                        Doctors
                      </th>
                      {days.map((day, index) => (
                        <th key={index} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredRecords.map((record, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 bg-gray-50 lg:sticky left-0 z-10">
                          {record.name}
                        </td>
                        {days.map((day, i) => (
                          <td key={i} className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {record.availability.timeSlots
                              .filter((slot) => slot.day === day)
                              .map((slot, idx) => (
                                <div key={idx} className="mb-2">
                                  <button
                                    onClick={() => handleButtonClick(slot.start, slot.end, record.name,idx)}
                                    className={`px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${slot.booked ? 'bg-red-500' : 'bg-green-500'} ${slot.booked ? 'text-gray-300' : 'text-white'} transition-transform transform hover:scale-105`}
                                    disabled={slot.booked} // Disable the button if it's booked
                                  >
                                    {`${new Date(slot.start).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - ${new Date(slot.end).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`}
                                  </button>
                                </div>
                              ))}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <Payment userId={userId} docId={docId} startTime={startTime } endTime={ endTime} day={day}/>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Booking;
