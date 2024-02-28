import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React, { ReactNode } from 'react'

const Homelayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='flex min-h-screen flex-col justify-between'>
            <Navbar />
            <main className='flex-1'>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Homelayout