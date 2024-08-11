import React, { useState } from 'react';
import { useSignUpDoctor } from '../../../shared/hooks/useSignUpDoctor';
import { useNavigate } from 'react-router-dom';

const DoctorSignup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [availability, setAvailability] = useState([]);
    const { signUp, error, isLoading } = useSignUpDoctor();
    const navigate = useNavigate();

    const handleAddAvailability = () => {
    const day = prompt("Enter day (e.g., Monday):");
    const startTime = prompt("Enter start time (e.g., 16:00):"); // use 24-hour format
    if (day && startTime) {
        // Parse input time in IST
        const [hours, minutes] = startTime.split(':').map(Number);
        const istOffset = 5.5 * 60; // IST offset in minutes (5 hours 30 minutes)
        const localDate = new Date();
        localDate.setUTCHours(hours - istOffset / 60, minutes, 0, 0);
        
        // Start and end times in UTC
        const start = new Date(localDate.toISOString());
        const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hour later
        
        setAvailability([
            ...availability,
            { day, start: start.toISOString(), end: end.toISOString() }
        ]);
    }
};

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signUp(name, email, password, phoneNumber, gender, age, licenseNumber, yearsOfExperience, availability);
    };

    return (
        <section className="relative flex flex-wrap lg:h-screen lg:items-center">
            <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl">Doctor Signup</h1>
                    <p className="mt-4 text-gray-500">Please sign up to create your account.</p>
                </div>

                <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                    {/* Fields for name, email, etc. */}
                    <div>
                        <label htmlFor="name" className="sr-only">Name</label>
                        <input
                            id="name"
                            type="text"
                            className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className="sr-only">Phone Number</label>
                        <input
                            id="phoneNumber"
                            type="text"
                            className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                            placeholder="Enter phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="gender" className="sr-only">Gender</label>
                        <select
                            id="gender"
                            className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="age" className="sr-only">Age</label>
                        <input
                            id="age"
                            type="number"
                            className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                            placeholder="Enter age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="licenseNumber" className="sr-only">License Number</label>
                        <input
                            id="licenseNumber"
                            type="text"
                            className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                            placeholder="Enter license number"
                            value={licenseNumber}
                            onChange={(e) => setLicenseNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="yearsOfExperience" className="sr-only">Years of Experience</label>
                        <input
                            id="yearsOfExperience"
                            type="number"
                            className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                            placeholder="Enter years of experience"
                            value={yearsOfExperience}
                            onChange={(e) => setYearsOfExperience(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                            onClick={handleAddAvailability}
                        >
                            Add Availability
                        </button>
                    </div>

                    {/* Display added availability */}
                    {availability.length > 0 && (
                        <ul className="mt-4">
                            {availability.map((slot, index) => (
                                <li key={index} className="text-gray-700">
                                    {slot.day}: {new Date(slot.start).toLocaleTimeString()} - {new Date(slot.end).toLocaleTimeString()}
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing up...' : 'Sign Up'}
                        </button>
                    </div>
                </form>

                {error && <div className="mt-4 text-red-500">{error}</div>}
            </div>

            <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
                <img
                    alt="Signup"
                    src="https://images.unsplash.com/photo-1560807707-8cc77767d783?ixid=MXwyMDg5NjE3NzA4Njc0MDUyNzU2MzA3MTYwMDUyMjA5NTk4MTg0NjUyMzg1NzM3NTU0NzMwNzk2Njk0M2FhMzQ&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>
        </section>
    );
};

export default DoctorSignup;
