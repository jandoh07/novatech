import { create} from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types/User';

interface UserState {
    user: User | null;
    setUser: (user: User) => void;
    logout: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user: User) => set({ user }),
            logout: () => set({ user: null }),
        }),
        { name: 'user' }
    )
)

interface CartState {
    cart: string[];
    add_to_cart: (id: string) => void;
    remove_from_cart: (product: string) => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],
            add_to_cart: (id: string) => set((state) => ({ cart: [...state.cart, id] })),
            remove_from_cart: (id: string) => set((state) => ({ cart: state.cart.filter((p) => p !== id) })),
        }),
        { name: 'cart' }
    )
)