"use client";
import { createContext, ReactNode, useContext, useState } from "react";

// 1️⃣ Define types
type User = {
    id: number;
    username: string;
};

type UserContextType = {
    user: User;
    setUser: (user: User) => void;
};

type UserProviderProps = {
    children: ReactNode;
    initialUser: User;
};

// 2️⃣ Create the context object
export const UserContext = createContext<UserContextType | undefined>(undefined);

// 3️⃣ Create a provider component
export const UserProvider = ({ children, initialUser }: UserProviderProps) => {
    const [user, setUser] = useState<User>(initialUser);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// 4️⃣ Hook to use the context safely
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within a UserProvider");
    return context;
};
