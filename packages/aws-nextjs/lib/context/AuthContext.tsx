"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type BasicUser = {
    id: number;
    username: string;
}

interface AuthContextType {
    user: BasicUser | null;
    setUser: (user: BasicUser | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, initialUser }: { children: ReactNode; initialUser: BasicUser | null }) {
    const [user, setUser] = useState<BasicUser | null>(initialUser);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
}
