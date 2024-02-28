'use client'
import react, { useState, useEffect } from 'react';
// import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
// import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import Image from 'next/image';
import { IProduct } from '@/types';
import { Minus, Plus, Trash } from 'lucide-react';
import { useCartStore } from '@/store/store';

interface Props {
    item: IProduct
}


const Cart = ({ item }: Props) => {
    const removeFromCart = useCartStore(state => state.removeFromCart)
    const addToCart = useCartStore(state => state.addToCart)
    const decreaseFromCart = useCartStore(state => state.decreaseFromCart)

    const { id, name, description, image, price, quantity } = item


    return (
        <div className="p-2 w-full max-h-[200px] bg-gray-600 text-black flex justify-between items-center rounded-lg">
            {/* <div className="w-[200px] h-full">
                <img
                    src={image}
                    width={200}
                    height={150}
                    alt="cart images"
                    className="object-cover object-center w-full h-full"
                />
            </div> */}
            <div className='w-[100px] md:w-[120px] rounded-xl overflow-hidden h-[80px] md:h-[100px] '>
                <Image src={image} alt={name} width={200} height={200} className="w-full h-full object-cover object-center " />
            </div>
            <div className="flex gap-2 items-center">
                <div>
                    <Minus
                        onClick={() => decreaseFromCart(item)}
                        size={30}
                        className="font-extrabold  bg-yellow-400 rounded-md p-1  text-xl"
                    />
                </div>
                <div>
                    <p className="font-bold text-xl">{quantity}</p>
                </div>
                <div>
                    <Plus
                        onClick={() => addToCart(item)}
                        size={30}
                        className="font-extrabold bg-yellow-400  rounded-md p-1 text-xl"
                    />
                </div>
            </div>
            <div className="space-y-4">
                <p className="text-xl text-yellow-600 font-bold uppercase">
                    ${price * quantity! as number}
                </p>
                <button>
                    <Trash size={25} onClick={() => removeFromCart(item)} className="text-red-500" />
                </button>
            </div>
        </div>
    );
};

export default Cart;
