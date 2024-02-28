import React from 'react'
// import OneProduct from './OneProduct'
// import { fetcher } from '../lib/fetchhooks'
import useSWR from 'swr'
import { Loader } from 'lucide-react'
import data from '@/data/data.json'
import Product from './Product'
// import { AiOutlineLoading3Quarters } from 'react-icons/ai'
// import DropDown from './DropDown'




const Products = () => {
    // const { data: products, error, isLoading } = useSWR('/api/products', fetcher)

    // if (error) {
    //     return <div>{error.message}</div>
    // }
    const products = data

    return (
        <div className='container my-10'>
            <div className='flex flex-col items-center justify-between gap-6 py-10 md:flex-row '>
                <h1 className='inline-block text-2xl font-bold text-yellow-500 uppercase border-b-8 border-red-500'> OURS PRODUCTS</h1>
                {/* <DropDown /> */}
            </div>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>
                {products ? products.map((product) => {
                    return <Product key={product.id} product={product} />
                }) : (<div className="flex flex-col items-center justify-center w-full min-h-screen">
                    <Loader size={50} className="text-yellow-500 animate-spin" />
                </div>)}
            </div>
        </div>
    )
}

export default Products