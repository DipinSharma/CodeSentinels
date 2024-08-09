import React from 'react'

const CTA = () => {
    return (
        <div className='mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8'>
            <section className="overflow-hidden rounded-lg shadow-2xl md:grid md:grid-cols-3">
                <img
                    alt=""
                    src="https://coreldrawdesign.com/resources/previews/preview-abstract-doctor-character-infographic-vector-free-1697172572.jpg"
                    className="h-32 w-full object-cover md:h-full"
                />

                <div className="p-4 text-center sm:p-6 md:col-span-2 lg:p-8">
                    <p className="text-sm font-semibold uppercase tracking-widest"></p>

                    <h2 className="mt-6 font-black uppercase">
                        <span className="text-4xl font-black sm:text-5xl lg:text-6xl"> Are you a Doctor?</span>

                        <span className="mt-2 block text-sm">Be a part of our panel of specialists and connect with your patients from anywhere.</span>
                    </h2>

                    <a
                        className="mt-8 inline-block w-full bg-black py-4 text-sm font-bold uppercase tracking-widest text-white"
                        href="/login"
                    >
                        Join Us
                    </a>

                </div>
            </section>
        </div>
    )
}

export default CTA