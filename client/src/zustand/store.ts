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