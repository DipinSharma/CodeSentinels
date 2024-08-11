import React, { useEffect, useState } from 'react'

function UserSessions() {

    const [data, setData] = useState(null)

    const render = async () => {
        let res = await fetch('http://localhost:5000/details/getUserSessions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: localStorage.getItem('userId')
            })
        })
        res = await res.json();
        setData(res);
    }

    useEffect(() => {
        localStorage.setItem('userId','66b6157671bcb6a25a018480');
        render()
    }, [])

    return (
        <div>
            {data && data.filter((i) => (new Date(i.endTime) > (new Date()))).map((i) => (
                <a
                    href="#"
                    className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
                >
                    <span
                        className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
                    ></span>

                    <div className="sm:flex sm:justify-between sm:gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                                Meeting Scheduled for {new Date(i.startTime).toLocaleDateString()} at {new Date(i.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                            </h3>

                            <p className="mt-1 text-xs font-medium text-gray-600">With {i.docName}</p>
                        </div>

                        <div className="hidden sm:block sm:shrink-0">
                            <img
                                alt=""
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                                className="size-16 rounded-lg object-cover shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <p className="text-pretty text-sm text-gray-500">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. At velit illum provident a, ipsa
                            maiores deleniti consectetur nobis et eaque.
                        </p>
                    </div>

                    <dl className="mt-6 flex gap-4 sm:gap-6">
                        <div className="flex flex-col-reverse">
                            <dt className="text-sm font-medium text-gray-600">Completed</dt>
                            <dd className="text-xs text-gray-500">Payment</dd>
                        </div>

                        <a
                            className="group flex items-center justify-between gap-4 rounded-lg border border-indigo-600 bg-indigo-600 px-5 py-3 transition-colors hover:bg-transparent focus:outline-none focus:ring"
                            href="#"
                        >
                            <span
                                className="font-medium text-white transition-colors group-hover:text-indigo-600 group-active:text-indigo-500"
                            >
                                To the Meeting
                            </span>

                            <span
                                className="shrink-0 rounded-full border border-current bg-white p-2 text-indigo-600 group-active:text-indigo-500"
                            >
                                <svg
                                    className="size-5 rtl:rotate-180"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </span>
                        </a>
                    </dl>
                </a>
            ))}
        </div>
    )
}

export default UserSessions;