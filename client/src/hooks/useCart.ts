import { useState } from "react";
import { customAxios } from "../axios/axios";
import { useCartStore, useUserStore } from "../zustand/store"
import { Product } from "../types/Product";


const useCart = () => {
    const { user, setUser } = useUserStore();
    const { add_to_cart, remove_from_cart } = useCartStore();
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const addToCart = async (id: string) => {
        if (user) {
            setUser({
                ...user,
                cart: [...user.cart, id]
            })

            await customAxios.post(`/cart/${id}`)
        } else {
            add_to_cart(id)
        }
    }

    const removeFromCart = async (id: string) => {
        if (user) {
            setUser({
                ...user,
                cart: user.cart.filter((p) => p !== id)
            })

            await customAxios.delete(`/cart/${id}`)
        } else {
            remove_from_cart(id)
        }
    }

    const setCartTotalPrice = (cart: Product[]) => {
        setTotalPrice(cart.reduce((acc, curr) => acc + curr.price, 0))
    }

    return { addToCart, removeFromCart, setCartTotalPrice, totalPrice, setTotalPrice }
}

export default useCart