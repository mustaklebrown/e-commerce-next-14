'use client'
import Product from '@/components/Product';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { IProduct } from './[id]/page';
import data from '@/data/data.json'
import { buttonVariants } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';


// const getProducts = async () => {
//     const res = await fetch("/data/data.json", {
//         next: {
//             revalidate: 5000
//         }
//     })

//     return res.json()
// }
// const getCategoriess = async () => {
//     const res = await fetch("http://localhost:3000/api/category", {
//         next: {
//             revalidate: 5000
//         }
//     })

//     return res.json()
// }

const Page = () => {
    const products = data
    // const products: IProduct[] = await getProducts()
    const [text, setText] = useState("")
    const [filteredProducts, setFilteredProducts] = useState<IProduct[] | []>(products)
    const router = useRouter()
    const categories = products.map(p => p.category.name)
    const uncat = new Set(categories)
    const array = [...Array.from(uncat)]


    const filterProducts = (category: string) => {
        // if (!text) {
        //     filteredProducts == products
        // }
        // if (text) {
        //     const newProducts = products.filter((product) => product.category.name.toLocaleLowerCase().includes(text.toLocaleLowerCase()))
        //     setFilteredProducts(newProducts)
        // }
        if (!category) {
            filteredProducts == products
        }
        // const newProducts = products && products.filter((product) => product.name.toLocaleLowerCase().includes(text.toLocaleLowerCase()))
        const newProducts = products.filter((product) => product.category.name === category)
        setFilteredProducts(newProducts)
    }

    // useEffect(() => {
    //     filterProducts(text)
    // }, [text])
    return (
        <div className="py-8 container mx-auto px-4 md:px-6 lg:px-8 ">
            <div className="my-4 flex flex-col md:flex-row justify-between items-center gap-6">
                <h2 className="text-xl uppercase mb-5 font-bold">All<span className="text-primary">Products</span> ({filteredProducts?.length})</h2>
                <form className="max-w-[500px] flex-grow min-w-[400px]">
                    <input value={text} onChange={(e) => setText(e.target.value)} type="text" id="default-input" className="bg-gray-50 border border-gray-800 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block placeholder-white  w-full p-2.5 dark:bg-yellow-700 dark:border-yellow-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </form>
            </div>
            <div className="flex flex-wrap items-center gap-2 my-6 ">
                <button
                    onClick={() => setFilteredProducts(products)}
                    className={buttonVariants()}
                >
                    All
                </button>
                {array.map((btn, i) => (
                    <Link href={`products?category=${btn}`}
                        key={i}
                        onClick={() => filterProducts(btn)}
                        className={cn("capitalize", buttonVariants())}
                    >
                        {btn}
                    </Link>
                ))}
            </div>
            <div>
                <div className="w-full gap-8 grid grid-cols-1 sm:grid-cols-2 items-center justify-center md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  ">
                    {filteredProducts?.map((product) => {
                        return (
                            <Product key={product.id} product={product} />
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Page