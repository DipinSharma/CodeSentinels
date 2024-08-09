import React from 'react'

export const ConvenienceSection = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="lg:py-24">
            <h2 className="text-3xl font-bold sm:text-4xl">Convenient</h2>

            <p className="mt-4 text-gray-600">
              Experience the convenience of accessing healthcare from the comfort of your own home. Our telehealth application allows you to schedule consultations, communicate with doctors through video calls and chat, and view past consultations all in one place. Say goodbye to long wait times and travel hassles, and say hello to a more convenient healthcare experience.
            </p>

            
          </div>
        </div>
      </div>
    </section>
  )
}
