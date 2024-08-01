import { createContext, useContext, useEffect, useState } from "react";
import { currentUser, signUpUser, signInUser, signOutUser } from "@/lib/appwrite/auth";

import { SignIn, SignUp, User } from "@/types/user";
import { toast } from "sonner";

type AuthContextState = {
    user: User | null;
    loading: boolean;
    error: string | null;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    signUp: (user: SignUp) => Promise<void>;
    signIn: (user: SignIn) => Promise<void>;
    signOut: () => Promise<void>;
};

const initialState: AuthContextState = {
    user: null,
    loading: false,
    error: null,
    setLoading: async () => {},
    signUp: async () => {},
    signIn: async () => {},
    signOut: async () => {},
};

export const AuthContext = createContext<AuthContextState>(initialState);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const setCurrentUser = async () => {
        setLoading(true);

        try {
            const result = await currentUser();
            setUser(result as User | null);
        } catch (error) {
            setError(error as string);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const signUp = async (data: SignUp) => {
        setLoading(true);

        try {
            const result: any = await signUpUser(data);

            if (result.status === "error") {
                throw result;
            }

            const session = await currentUser();

            setUser(session as User | null);
        } catch (error: any) {
            if (error.code === 409) {
                toast.error("Email already exists");
            }

            setError(error as string);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (data: SignIn) => {
        setLoading(true);

        try {
            const result: any = await signInUser(data);

            if (result.status === "error") {
                throw result;
            }

            const session = await currentUser();

            setUser(session as User | null);
        } catch (error: any) {
            if (error.code === 401) {
                toast.error("Invalid email or password");
            }

            setError(error as string);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        setLoading(true);

        try {
            const result: any = await signOutUser();

            if (result.status === "error") {
                throw result;
            }

            setUser(null);
        } catch (error) {
            toast.error("Error signing out");
            setError(error as string);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setCurrentUser();
    }, []);

    return <AuthContext.Provider value={{ user, loading, error, setLoading, signUp, signIn, signOut }}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
