import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorForm = () => {
  const navigate = useNavigate();
  const [days, setDays] = useState([{ day: "", start: "", end: "" }]);

  const handleAddDay = () => {
    setDays([...days, { day: "", start: "", end: "" }]);
  };

  const handleRemoveDay = (index) => {
    const newDays = [...days];
    newDays.splice(index, 1);
    setDays(newDays);
  };

  const handleChange = (index, field, value) => {
    const newDays = [...days];
    newDays[index][field] = value;
    setDays(newDays);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted");

    // Construct the form data
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      phoneNumber: e.target.phone.value,
      gender: e.target.gender.value,
      age: parseInt(e.target.age.value, 10),
      licenseNumber: e.target.licenseNumber.value,
      yearsOfExperience: parseInt(e.target.yearsOfExperience.value, 10),
      availability: days.map((day) => ({
        start: new Date(`${day.day}T${day.start}`).toISOString(),
        end: new Date(`${day.day}T${day.end}`).toISOString(),
        day: day.day,
      })),
    };

    console.log("Form Data:", formData);

    try {
      const response = await fetch("http://localhost:5000/user/doctorSignUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Success:", data);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div className="lg:col-span-2 lg:py-12">
            <p className="max-w-xl text-lg">
              Please fill out the form below to provide your information. This
              will help us better understand your needs and schedule your
              availability.
            </p>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Personal Information */}
              <div>
                <label className="sr-only" htmlFor="name">
                  Name
                </label>
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
                  <label className="sr-only" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Email address"
                    type="email"
                    id="email"
                    required
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="password">
                    Password
                  </label>
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
                <label className="sr-only" htmlFor="phone">
                  Phone
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Phone Number"
                  type="tel"
                  id="phone"
                  required
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="gender">
                  Gender
                </label>
                <select
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  id="gender"
                  required
                >
                  <option value="" disabled selected>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="sr-only" htmlFor="age">
                  Age
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Age"
                  type="number"
                  id="age"
                  required
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="licenseNumber">
                  License Number
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="License Number"
                  type="text"
                  id="licenseNumber"
                  required
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="yearsOfExperience">
                  Years of Experience
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Years of Experience"
                  type="number"
                  id="yearsOfExperience"
                  required
                />
              </div>

              {/* Availability */}
              <div>
                <h3 className="text-lg font-medium">Availability</h3>

                {days.map((day, index) => (
                  <div key={index} className="grid grid-cols-1 gap-4 sm:grid-cols-3 items-center">
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Day (YYYY-MM-DD)"
                      type="date"
                      value={day.day}
                      onChange={(e) => handleChange(index, "day", e.target.value)}
                      required
                    />
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Start Time"
                      type="time"
                      value={day.start}
                      onChange={(e) => handleChange(index, "start", e.target.value)}
                      required
                    />
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="End Time"
                      type="time"
                      value={day.end}
                      onChange={(e) => handleChange(index, "end", e.target.value)}
                      required
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveDay(index)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddDay}
                  className="mt-4 inline-block rounded-lg bg-blue-500 px-5 py-3 text-white"
                >
                  Add Day
                </button>
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
  );
};

export default DoctorForm;
