"use client"
import { ClerkProvider } from "@clerk/nextjs";
import { FunctionComponent, ReactNode } from "react";

interface AuthProviderProps {
    children: ReactNode
}
 
const AuthProvider: FunctionComponent<AuthProviderProps> = ({children}) => (
    <ClerkProvider
        polling={true}
        publishableKey={`${process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}`}
    >
        {children}
    </ClerkProvider>
)
 
export default AuthProvider;