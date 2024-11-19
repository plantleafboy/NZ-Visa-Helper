import {create} from 'zustand';
import {persist} from "zustand/middleware";

type UserAuthState = {
    userId: number | null;
    userAuthToken: string | null;
    authenticated: boolean;
    setState: (userId: number, userAuthToken: string, password: string, userEmail: string) => void;
    resetState: () => void;
    password: string | null;
    userEmail: string | null;
}

export const useUserAuthStateStore = create<UserAuthState>()(
    persist(
        (set) => ({
            userId: null,
            userAuthToken: null,
            authenticated: false,
            setState: (userId: number, received: string, password: string, userEmail: string) =>
                set({ userId: userId, userAuthToken: received, authenticated: true, password: password, userEmail: userEmail }),
            resetState: () => set({ userId: null, userAuthToken: null, authenticated: false }),
            password: null,
            userEmail: null,
        }),
        {
            name: "userAuthState-store",
            getStorage: () => localStorage,
        },
    ),
);
