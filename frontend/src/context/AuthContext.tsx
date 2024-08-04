import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

type AuthUserType = {
    id: string;
    fullname: string;
    email: string;
    profilePic: string;
    gender: string
}

//Declare init states, generics for each type of the state
const AuthContext = createContext<{
    authUser: AuthUserType | null;
    setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>;
    isLoading: boolean;
}>({
    authUser: null,
    setAuthUser: () => {},
    isLoading: true,

});

// Create some hooks
export const useAuthContext = () => {
    return useContext(AuthContext);
}

// Wrap the whole children (App) in the Context provider. 
export const AuthContextProvider = ({children}:{children:ReactNode}) => {
    const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    // Logic to check user is available or not 
    useEffect(() => {
        const fetchAuthUser = async () => {
            try {
                const res = await fetch("/api/auth/me")
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.message);
                }
                setAuthUser(data);
            } catch (error: any) {
               console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchAuthUser();
    }, []);
    return (
        <AuthContext.Provider 
            value={{
                authUser,
                isLoading,
                setAuthUser
            }}
        
        >
            {children}
        </AuthContext.Provider>
    )
}