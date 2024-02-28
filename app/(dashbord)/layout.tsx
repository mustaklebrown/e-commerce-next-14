import React, { ReactNode } from 'react'
import DashNav from './_components/DashNav'

const Homelayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <DashNav />
            <main>

                {children}
            </main>
        </div>
    )
}

export default Homelayout