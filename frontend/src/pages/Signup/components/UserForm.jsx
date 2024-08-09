import React from "react";
import { useNavigate } from "react-router-dom";
const UserForm = () => {
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
      // Additional fields can be added here as needed
    };

    console.log("Form Data:", formData);

    // API call to backend
    try {
      const response = await fetch('http://localhost:5000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Success:', data);
      navigate("/login");
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <>
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-2 lg:py-12">
              <p className="max-w-xl text-lg">
                Please fill out the form below to provide your information. This will help us better understand your needs and process your registration.
              </p>
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
                  <label className="sr-only" htmlFor="phone">Phone Number</label>
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

export default UserForm;
