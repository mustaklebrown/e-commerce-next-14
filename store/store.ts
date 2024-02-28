import { create } from 'zustand';

import { IProduct } from '../types';
import { persist } from 'zustand/middleware';

// Define the interface of the Cart state
interface State {
  cart: IProduct[];
  totalItems: number;
  totalPrice: number;
}

// Define the interface of the actions that can be performed in the Cart
interface Actions {
  addToCart: (Item: IProduct) => void;
  decreaseFromCart: (Item: IProduct) => void; //
  removeFromCart: (Item: IProduct) => void;
  clearCart: () => void;
}

// Initialize a default state
const INITIAL_STATE: State = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

// Create the store with Zustand, combining the status interface and actions
// export const useCartStore = create<State & Actions>((set, get) => ());

export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      addToCart: (product: IProduct) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item.id === product.id);

        // If the item already exists in the Cart, increase its quantity
        if (cartItem) {
          const updatedCart = cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity as number) + 1 }
              : item
          );
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.price,
          }));
        } else {
          const updatedCart = [...cart, { ...product, quantity: 1 }];

          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.price,
          }));
        }
      },
      decreaseFromCart: (product: IProduct) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item.id === product.id);

        if ((cartItem?.quantity as number) > 1) {
          if (cartItem) {
            const updatedCart = cart.map((item) =>
              item.id === product.id
                ? {
                    ...item,
                    quantity: (item.quantity as number) - 1,
                  }
                : item
            );

            set((state) => ({
              cart: updatedCart,
              totalItems: state.totalItems - 1,
              totalPrice: state.totalPrice - product.price,
            }));
          } else {
            const updatedCart = [...cart, { ...product, quantity: 1 }];

            set((state) => ({
              cart: updatedCart,
              totalItems: state.totalItems - 1,
              totalPrice: state.totalPrice - product.price,
            }));
          }
        }
        // If the item already exists in the Cart, increase its quantity
      },
      removeFromCart: (product: IProduct) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== product.id),
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - product.price,
        }));
      },
      clearCart: () => {
        set((state) => ({
          cart: [],
          totalItems: 0,
          totalPrice: 0,
        }));
      },
    }),
    {
      name: 'cart-storage', // unic name
      // getStorage: () => sessionStorage, (optional) by default the 'localStorage' is used
    }
  )
);
