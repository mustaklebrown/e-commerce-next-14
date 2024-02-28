import React, { ReactNode } from 'react'
import data from '@/data/data.json'
import Image from 'next/image'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'

interface Props {
    params: {
        id: string
    }
}

export interface IProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    categoryId: string;
    category: {
        id: string;
        name: string;
    };
}

const page = ({ params: { id } }: Props) => {

    const productData = data

    const product: IProduct = productData.find(p => p.id === id) as IProduct



    return (
        <div className="flex flex-col items-center justify-center h-auto py-10 pt-20 space-y-4">
            <div className="flex flex-col items-start justify-center w-full gap-8 md:flex-row lg:gap-20 ">
                <div className="space-y-4">
                    <div className=" overflow-hidden h-full max-h-[450px]">
                        <Image
                            src={product.image}
                            alt="singledetails"
                            width={580}
                            height={420}
                            className="object-cover object-bottom h-full"
                        />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-xl italic font-semibold text-yellow-600 uppercase">
                            existing colors
                        </h2>
                        <div className="flex flex-wrap items-start gap-2 space-x-2 text-gray-100">
                            <div className="flex items-center justify-center p-4 duration-200 bg-red-600 border rounded-md shadow-md cursor-pointer hover:scale-105 shadow-gray-600 ">
                                red
                            </div>
                            <div className="flex items-center justify-center p-4 duration-200 bg-blue-600 border rounded-md shadow-md cursor-pointer hover:scale-105 shadow-gray-600 ">
                                blue
                            </div>
                            <div className="flex items-center justify-center p-4 duration-200 bg-yellow-600 border rounded-md shadow-md cursor-pointer hover:scale-105 shadow-gray-600 ">
                                yellow
                            </div>
                            <div className="flex items-center justify-center p-4 duration-200 bg-black border rounded-md shadow-md cursor-pointer hover:scale-105 shadow-gray-600 ">
                                black
                            </div>
                        </div>
                    </div>
                    {/* <button
                        onClick={() => dispatch(setAddItemToCart(product))}
                        className="btn"
                    >
                        add to cart{' '}
                    </button> */}
                </div>
                <div className="max-w-md">
                    <h1 className="mb-5 text-2xl italic font-bold text-yellow-600 uppercase">
                        {product?.name}
                    </h1>
                    <p className="mb-5 text-lg text-gray-900 font-semilight">
                        {product?.description}
                    </p>
                    <div className="mt-2 space-y-6">
                        <div className="flex justify-between w-full px-10 py-4 bg-gray-100 shadow-md  shadow-indigo-400 rounded-xl">
                            <p className="italic font-bold text-gray-800 uppercase text-md">
                                genre
                            </p>
                            <p className="text-2xl font-medium text-gray-800 uppercase">
                                {product?.category.name}
                            </p>
                        </div>
                        <div className="flex justify-between w-full px-10 py-4 bg-gray-100 shadow-md shadow-indigo-400 rounded-xl">
                            <p className="italic font-bold text-gray-800 uppercase text-md">
                                price
                            </p>
                            <p className="text-2xl font-medium text-gray-800 uppercase">
                                $ {product?.price}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div>

                <Link
                    href={"/"}
                    scroll={false}
                    // onClick={() => router.back()}
                    className={buttonVariants()}
                >
                    go back
                </Link>

            </div>
        </div>
    )
}

export default page