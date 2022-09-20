import {createContext, ReactNode, useState} from "react";

interface IProfile {
    id: number;
    username: string;
    email: string;
}

type Profile = IProfile | null;

export const AuthContext = createContext<{
    user: Profile;
    setUser: (value: Profile) => void;
}>({user: null, setUser: () => {}});

interface IProps {
    children: ReactNode;
}


export const AuthProvider = ({children}: IProps) => {
    const [user, setUser] = useState<Profile>(null);

    return <AuthContext.Provider value={{user, setUser}}>{children}</AuthContext.Provider>
}