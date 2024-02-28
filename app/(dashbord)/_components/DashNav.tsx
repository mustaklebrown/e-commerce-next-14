'use client'
import { cn } from '@/lib/utils'
import { Layers, List, ActivitySquare } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
const links = [
    {
        href: "/admin",
        name: "dashbord",
        icon: ActivitySquare
    },
    {
        href: "/admin/category",
        name: "category",
        icon: List
    },
    {
        href: "/admin/products",
        name: "products",
        icon: Layers
    },

]

const DashNav = () => {
    const pathname = usePathname()
    return (
        <div className='py-3 border-b-2'>
            <nav className='container flex justify-center md:justify-between items-center flex-wrap'>
                <div>
                    <h1 className="font-bold text-primary  uppercase text-md md:text-lg lg:text-xl">Mus<span className="font-sans text-destructive">Ecommerce</span></h1>
                </div>
                <ul className='flex gap-x-4'>
                    {links.map((l, i) => {
                        const Icon = l.icon
                        return <Link key={i} href={l.href} className={cn('flex gap-x-1 items-center font-semibold hover:text-primary duration-200 capitalize', pathname == l.href ? "text-primary" : "")}>
                            <span>
                                <Icon size={20} />
                            </span>
                            {l.name}
                        </Link>

                    })}
                </ul>

            </nav>

        </div>
    )
}

export default DashNav