import React from 'react'

const StreamlinedSection = () => {
    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <header>
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Experience Seamless Telehealth with Our Application</h2>

                    <p className="mt-4 max-w-md text-gray-500">
                        Our telehealth application offers a seamless user experience with secure video calls, real-time transcription, and easy booking. Sign up today and experience the future of healthcare.
                    </p>
                </header>

                <ul className="mt-8 grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
                    <li>
                        <a href="#" className="group block overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                alt=""
                                className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                            />

                            <div className="relative bg-white pt-3">
                                <h3 className="text-xl text-gray-700">
                                    Secure Video Calls
                                </h3>

                                <p className="mt-4 max-w-md text-gray-500">
                                    Connect with healthcare professionals through secure video calls
                                </p>
                            </div>
                        </a>
                    </li>

                    <li>
                        <a href="#" className="group block overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                alt=""
                                className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                            />

                            <div className="relative bg-white pt-3">
                            <h3 className="text-xl text-gray-700">
                                    Real-Time Transcription
                                </h3>

                                <p className="mt-4 max-w-md text-gray-500">
                                    Get real-time transcription during your telehealth consultations.
                                </p>
                            </div>
                        </a>
                    </li>

                    <li>
                        <a href="#" className="group block overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                alt=""
                                className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                            />

                            <div className="relative bg-white pt-3">
                            <h3 className="text-xl text-gray-700">
                                    Easy Booking Process
                                </h3>

                                <p className="mt-4 max-w-md text-gray-500">
                                    Schedule your consultations with ease using our simple booking process.

                                </p>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default StreamlinedSection