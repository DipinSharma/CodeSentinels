import React from 'react'

const Stats = () => {
    return (
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
            <div className="mt-8 sm:mt-12">
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                        <dt className="order-last text-lg font-medium text-gray-500">Total Consultations</dt>

                        <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">30L+</dd>
                    </div>

                    <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                        <dt className="order-last text-lg font-medium text-gray-500">Daily Consultations</dt>

                        <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">3k+</dd>
                    </div>

                    <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                        <dt className="order-last text-lg font-medium text-gray-500">Specialties</dt>

                        <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">22+</dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}

export default Stats