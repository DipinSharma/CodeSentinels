import React from "react";
import { useNavigate } from "react-router-dom";
const DoctorForm = () => {
    const navigate=useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      phoneNumber: e.target.phone.value,
      gender: e.target.gender.value,
      age: parseInt(e.target.age.value, 10),
      licenceNumber: e.target.licenceNumber.value,
      yearsOfExperience: parseInt(e.target.yearsOfExperience.value, 10),
      availability: [
        {
          start: e.target.start1.value,
          end: e.target.end1.value,
          day: e.target.day1.value,
        },
        {
          start: e.target.start2.value,
          end: e.target.end2.value,
          day: e.target.day2.value,
        },
        {
          start: e.target.start3.value,
          end: e.target.end3.value,
          day: e.target.day3.value,
        },
        // {
        //   start: e.target.start4.value,
        //   end: e.target.end4.value,
        //   day: e.target.day4.value,
        // },
        // {
        //   start: e.target.start5.value,
        //   end: e.target.end5.value,
        //   day: e.target.day5.value,
        // },
        // Add more availability fields as needed
      ],
    };

    console.log("Form Data:", formData);

    // API call to backend
   const response=await fetch('http://localhost:5000/user/doctorSignUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      navigate('/login');
      // Handle success (e.g., show a success message, redirect, etc.)
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle error (e.g., show an error message)
    });
  };

  return (
    <>
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-2 lg:py-12">
              <p className="max-w-xl text-lg">
                Please fill out the form below to provide your information. This will help us better understand your needs and schedule your availability.
              </p>

              <div className="mt-8">
                {/* <a href="#" className="text-2xl font-bold text-pink-600"> 0151 475 4450 </a>
                <address className="mt-2 not-italic">282 Kevin Brook, Imogeneborough, CA 58517</address> */}
              </div>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="sr-only" htmlFor="name">Name</label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Name"
                    type="text"
                    id="name"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="sr-only" htmlFor="email">Email</label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Email address"
                      type="email"
                      id="email"
                      required
                    />
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="password">Password</label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Password"
                      type="password"
                      id="password"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="sr-only" htmlFor="phone">Phone</label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Phone Number"
                    type="tel"
                    id="phone"
                    required
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="gender">Gender</label>
                  <select
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    id="gender"
                    required
                  >
                    <option value="" disabled selected>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="sr-only" htmlFor="age">Age</label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Age"
                    type="number"
                    id="age"
                    required
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="licenceNumber">Licence Number</label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Licence Number"
                    type="text"
                    id="licenceNumber"
                    required
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="yearsOfExperience">Years of Experience</label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Years of Experience"
                    type="number"
                    id="yearsOfExperience"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label htmlFor="day1" className="block">Day 1</label>
                    <select className="w-full rounded-lg border-gray-200 p-3 text-sm" id="day1" required>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                    </select>

                    <label className="sr-only" htmlFor="start1">Start Time</label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Start Time"
                      type="datetime-local"
                      id="start1"
                      required
                    />

                    <label className="sr-only" htmlFor="end1">End Time</label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="End Time"
                      type="datetime-local"
                      id="end1"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="day2" className="block">Day 2</label>
                    <select className="w-full rounded-lg border-gray-200 p-3 text-sm" id="day2" required>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                    </select>

                    <label className="sr-only" htmlFor="start2">Start Time</label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Start Time"
                      type="datetime-local"
                      id="start2"
                      required
                    />

                    <label className="sr-only" htmlFor="end2">End Time</label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="End Time"
                      type="datetime-local"
                      id="end2"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="day3" className="block">Day 3</label>
                    <select className="w-full rounded-lg border-gray-200 p-3 text-sm" id="day3" required>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                    </select>

                    <label className="sr-only" htmlFor="start3">Start Time</label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Start Time"
                      type="datetime-local"
                      id="start3"
                      required
                    />

                    <label className="sr-only" htmlFor="end3">End Time</label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="End Time"
                      type="datetime-local"
                      id="end3"
                      required
                    />
                  </div>

                  {/* Add more availability blocks as needed */}
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default DoctorForm;
