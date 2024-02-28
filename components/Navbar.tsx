'use client'
import { navLinks } from '@/data/data'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button, buttonVariants } from './ui/button'
import { usePathname } from 'next/navigation'
import { useCartStore } from '@/store/store'
import { UserButton, useAuth, useSession } from '@clerk/nextjs'

const Navbar = () => {
    const total = useCartStore(state => state.totalItems)
    const session = useSession()
    const { isSignedIn } = useAuth()
    const pathname = usePathname()
    return (
        <div className="sticky top-0 left-0 z-[1000] w-full h-auto py-2 bg-background text-foreground border-b shadow-sm">
            <div className="container flex items-center justify-between">
                <Link href="/">
                    <h1 className="font-bold text-primary  uppercase text-md md:text-lg lg:text-2xl">Mus<span className="font-sans text-destructive">Ecommerce</span></h1>
                </Link>
                <nav>
                    <ul className="hidden space-x-4 md:flex">
                        {navLinks.map((link, i) => {
                            return <Link className="font-semibold uppercase transition-all duration-200 text-md hover:text-yellow-500" key={i} href={link.href}>{link.name}</Link>
                        })}
                        {/* {session && <Link className={isActive("/dashbord") ? 'text-md uppercase text-yellow-500 ' : 'text-md uppercase hover:text-yellow-500 duration-300 transition-colors'} href={"/dashbord"}>dashbord</Link>} */}
                    </ul>
                </nav>
                <div className="flex items-center space-x-4">
                    <Link href="/cart" className="relative ">
                        <div className="absolute -top-2 -right-2 z-50 flex text-slate-100 items-center justify-center w-5 h-auto bg-red-600 rounded-full">
                            <p>{total}</p>
                        </div>
                        <ShoppingBag size={30} />
                    </Link>
                    {session && <UserButton afterSignOutUrl="/" />}

                    {!isSignedIn && <Link href="/sign-in" className={buttonVariants()} onClick={() => { }} >login</Link>
                    }
                    {!isSignedIn && <Link href="/sign-up" className={buttonVariants()} >sign up</Link>
                    }
                    {/* {session ? <button className="btn-red" onClick={() => signOut()}>logOut</button> : <button className="btn" onClick={() => signIn("github")}>log in</button>} */}
                </div>
            </div>
        </div>
    )
}

export default Navbar