import React, { useState, useEffect } from 'react';
import Navbar from '../../shared/components/Navbar';
import Footer from '../../shared/components/Footer';

// Utility function to get the next 7 days starting from today
const getNext7Days = () => {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
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
  const [specialties, setSpecialties] = useState(["Pediatrician", "Dermatologist", "Cardiologist"]);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [records] = useState([
    {
      name: "John Doe",
      specialty: "Pediatrician",
      days: {
        Monday: [
          { time: "09:00 AM", available: true },
          { time: "01:00 PM", available: true },
          { time: "02:00 PM", available: false },
        ],
        Tuesday: [
          { time: "10:00 AM", available: true },
          { time: "02:00 PM", available: false },
        ],
        Wednesday: [
          { time: "09:30 AM", available: false },
          { time: "03:00 PM", available: true },
        ],
        Thursday: [
          { time: "10:30 AM", available: true },
          { time: "01:30 PM", available: true },
        ],
        Friday: [
          { time: "08:00 AM", available: true },
          { time: "12:00 PM", available: false },
        ],
        Saturday: [
          { time: "09:00 AM", available: true },
          { time: "01:00 PM", available: true },
        ],
        Sunday: [
          { time: "10:00 AM", available: false },
          { time: "02:00 PM", available: true },
        ],
      }
    },
    {
      name: "Jane Doe",
      specialty: "Dermatologist",
      days: {
        Monday: [
          { time: "10:00 AM", available: true },
          { time: "02:00 PM", available: false },
        ],
        Tuesday: [
          { time: "11:00 AM", available: true },
          { time: "03:00 PM", available: true },
        ],
        Wednesday: [
          { time: "10:30 AM", available: false },
          { time: "02:30 PM", available: true },
        ],
        Thursday: [
          { time: "11:30 AM", available: true },
          { time: "01:30 PM", available: true },
        ],
        Friday: [
          { time: "09:00 AM", available: true },
          { time: "12:00 PM", available: true },
        ],
        Saturday: [
          { time: "10:00 AM", available: true },
          { time: "01:00 PM", available: true },
        ],
        Sunday: [
          { time: "11:00 AM", available: true },
          { time: "02:00 PM", available: true },
        ],
      }
    },
    {
      name: "Gary Barlow",
      specialty: "Cardiologist",
      days: {
        Monday: [
          { time: "08:00 AM", available: true },
          { time: "12:00 PM", available: true },
        ],
        Tuesday: [
          { time: "09:00 AM", available: false },
          { time: "01:00 PM", available: true },
        ],
        Wednesday: [
          { time: "08:30 AM", available: true },
          { time: "01:30 PM", available: true },
        ],
        Thursday: [
          { time: "09:30 AM", available: true },
          { time: "02:00 PM", available: true },
        ],
        Friday: [
          { time: "07:00 AM", available: false },
          { time: "11:00 AM", available: true },
        ],
        Saturday: [
          { time: "08:00 AM", available: true },
          { time: "12:00 PM", available: true },
        ],
        Sunday: [
          { time: "09:00 AM", available: false },
          { time: "01:00 PM", available: true },
        ],
      }
    },
  ]);

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

  const filteredRecords = records.filter(record =>
    selectedSpecialties.length === 0 || selectedSpecialties.includes(record.specialty)
  );

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
                      <th className="lg:sticky md:sticky left-0 z-10 whitespace-nowrap px-6 py-3 font-medium text-gray-900 bg-white" style={{ width: '200px' }}>Name</th>
                      <th className="lg:sticky md:sticky left-[125px] z-10 whitespace-nowrap px-6 py-3 font-medium text-gray-900 bg-white">Specialty</th>
                      {days.map(day => (
                        <th key={day} className="whitespace-nowrap px-6 py-3 font-medium text-gray-900">{day}</th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {filteredRecords.map((record, index) => (
                      <tr key={index}>
                        <td className="lg:sticky md:sticky left-0 z-10 whitespace-nowrap px-6 py-4 font-medium text-gray-900 bg-white" style={{ width: '200px' }}>{record.name}</td>
                        <td className="lg:sticky md:sticky left-[125px] z-10 whitespace-nowrap px-6 py-4 text-gray-700 bg-white">{record.specialty}</td>
                        {days.map(day => (
                          <td key={day} className="whitespace-nowrap px-6 py-4">
                            {record.days[day]?.map((slot, idx) => (
                              <div key={idx} className="text-gray-700 mb-1">
                                <button
                                  className={`inline-flex items-center justify-center px-2 py-1 text-xs rounded border ${slot.available ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-red-500 text-white cursor-not-allowed'} focus:outline-none focus:ring-2 ${slot.available ? 'focus:ring-green-500' : 'focus:ring-red-500'}`}
                                  disabled={!slot.available}
                                >
                                  {slot.time}
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
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Booking;
