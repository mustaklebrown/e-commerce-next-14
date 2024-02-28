'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
// import { setAddItemToCart } from '../features/cartSlice';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { useCartStore } from '@/store/store';
// import { Product } from '@prisma/client';

// interface Props {
//     product: Product
// }

const OneProduct = ({ product }: any) => {
    const addToCart = useCartStore(state => state.addToCart)
    return (
        <>

            <div key={product.id} className='p-2 h-auto hover:-translate-y-1 duration-300 transition-all bg-gray-600 shadow-md shadow-yellow-400 rounded-md'>
                <Link href={`/products/${product.id}`} >
                    <div className='w-full h-[170px]'>
                        <Image src={product?.image!} alt={product.name} width={500} height={170} className='w-full h-full' />
                    </div>
                </Link>
                <div className='text-center flex flex-col items-center justify-center w-full py-2'>
                    <Link href={`/products/${product.id}`}  >
                        <h3 className='text-gray-100 uppercase font-semibold'>{product.name}</h3></Link>
                    <p className='text-lg text-yellow-500 font-bold'>$ {product.price}</p>
                    <Button className='btn block w-full' onClick={() => addToCart(product)}>add to cart</Button>
                </div>
            </div>


        </>
    )
}

export default OneProduct