/*import { createContext, useContext, useState } from "react";

export const AuthContext = createContext()

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({children}) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("auth-user")) || null)
    return <AuthContext.Provider value={{authUser,setAuthUser}}>
        {children}
    </AuthContext.Provider>
}
*/
import { createContext, useContext, useState, useMemo } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(() => {
        return JSON.parse(localStorage.getItem("auth-user")) || null;
    });

    const contextValue = useMemo(() => ({ authUser, setAuthUser }), [authUser]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
