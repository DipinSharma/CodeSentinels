import React from 'react'

const HeroSection = () => {
    return (
        <div className='mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8'>
            < section className="overflow-hidden  sm:grid sm:grid-cols-2 sm:items-center" >
                <div className="p-8 md:p-12 lg:py-24">
                    <div className="mx-auto max-w-xl ltr:sm:text-left rtl:sm:text-right">
                        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                            Online doctor consultation with qualified doctors

                        </h2>

                        <p className="hidden text-gray-500 md:mt-4 md:block">
                            Starting at ₹199
                        </p>

                        <div className="mt-4 md:mt-8">
                            <a
                                href="dashboard/booking"
                                className="inline-block rounded bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
                            >
                                Start New Consultation
                            </a>
                        </div>
                    </div>
                </div>

                <img
                    alt=""
                    src="https://onemg.gumlet.io/marketing/793368e4-7232-45b3-9690-2fc81da12287.svg"
                    className="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[60px]"
                />
            </section >
        </div>
    )
}

export default HeroSection