'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cart from '@/components/Cart';
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/store';

const CartPage = () => {
    const removeFromCart = useCartStore(state => state.removeFromCart)
    const addToCart = useCartStore(state => state.addToCart)
    const totalQTY = useCartStore(state => state.totalItems)
    const clearCart = useCartStore(state => state.clearCart)
    const cartItems = useCartStore(state => state.cart)
    const totalAmount = cartItems.reduce((acc, product) => acc + product.price * (product.quantity as number), 0);
    // const dispatch = useDispatch();
    // const [cartItems, setCartItems] = useState([])
    const router = useRouter()
    // const cartItemsTlk = useSelector(selectCartItems);
    // const totalAmount = useSelector(selectTotalAmount);
    // const totalQTY = useSelector(selectTotalQTY);
    // useEffect(() => {
    //     dispatch(getTotalQty());
    //     dispatch(getTotalAmount());
    //     setCartItems(cartItemsTlk)
    // }, [cartItems, dispatch, cartItemsTlk]);

    const createCheckoutSession = async () => {
        axios
            .post('/api/checkout_sessions', { cartItems })
            .then((res) => {
                console.log(res);
                window.location = res.data.sessionURL;
                // router.push(res.data.sessionURL)
            })
            .then((res) => {
                // onClearCartItems()
            })
            .catch((err) => console.log(err.message));
    };
    const redirectToCheckout = async () => {
        try {
            const stripe = await loadStripe(process.env.NEXT_PUBLIC_TEST_STRIPE_PUBLISHABLE_KEY as string);

            if (!stripe) throw new Error('Stripe failed to initialize.');

            const checkoutResponse = await fetch('/api/checkout_sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cartItems }),
            });

            const { sessionId } = await checkoutResponse.json();
            const stripeError = await stripe.redirectToCheckout({ sessionId });

            if (stripeError) {
                console.error(stripeError);
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (

        <div className="flex flex-col container mx-auto  gap-4 w-full h-full py-10">
            <div className="flex justify-between py-4 w-full">
                <p className="text-xl font-bold capitalize">cart items {totalQTY}</p>
                <button
                    className="text-md lg:text-lg font-semibold uppercase ease-in  transition-all duration-200 cursor-pointer bg-red-600 text-gray-100  hover:bg-red-800 px-2 py-1 rounded-md"
                    onClick={clearCart}
                >
                    clear cart
                </button>
            </div>
            {cartItems && cartItems.map((c) => {
                return <Cart key={c.id} item={c} />;
            })}

            <>
                <div className="bg-gray-600 text-gray-100">
                    <div className="flex justify-between w-full px-4  py-2 ">
                        <p className="text-xl font-bold uppercase">amouts</p>
                        <p className="text-xl font-bold uppercase">$ {totalAmount}.00</p>
                    </div>
                    <div className="flex justify-between w-full px-4  py-2 ">
                        <p className="text-xl font-bold uppercase">total quantity</p>
                        <p className="text-xl font-bold uppercase"> {totalQTY}</p>
                    </div>
                    <div className="flex justify-between w-full px-4  py-2">
                        <p className="text-xl font-bold uppercase">shipping amouts</p>
                        <p className="text-xl font-bold uppercase">$ 0.00</p>
                    </div>
                    <div className="flex justify-between w-full px-4  py-2 ">
                        <p className="text-xl font-bold uppercase">total amouts</p>
                        <p className="text-xl font-bold uppercase">$ {totalAmount}.00</p>
                    </div>
                </div>
                <button
                    className="text-md lg:text-lg font-semibold uppercase ease-in  transition-all duration-200 cursor-pointer bg-yellow-500 hover:text-gray-100  hover:bg-yellow-800 px-2 py-1 rounded-md"
                    onClick={redirectToCheckout}
                >
                    checkout
                </button>
            </>

        </div>


    )
}

export default CartPage