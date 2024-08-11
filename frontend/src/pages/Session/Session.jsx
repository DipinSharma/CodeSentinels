import React from 'react'
import Navbar from '../../shared/components/Navbar'
import Footer from '../../shared/components/Footer'
import UserSessions from './components/UserSessions'

const Session = () => {
    return (
        <>
            <Navbar />
            <UserSessions />
            <Footer />
        </>
    )
}

export default Session