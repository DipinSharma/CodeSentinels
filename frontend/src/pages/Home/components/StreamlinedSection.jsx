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
                        <a href="/" disabled className="group block overflow-hidden">
                            <img
                                src="https://assets-global.website-files.com/60a3c6ed0d50ee830d47b5bf/62cf10e2a2588fa937f160dd_Video%20call%20security-1000_x_525.png"
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
                                src="https://img.freepik.com/premium-vector/payment-transaction-done-via-app-illustration_57801-326.jpg"
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
                                src="https://easyslotbooking.com/images/graphics/to-add.png"
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