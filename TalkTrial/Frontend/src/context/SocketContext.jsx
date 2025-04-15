/*import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client"

const SocketContext = createContext()

export const useSocketContext = () => {
	return useContext(SocketContext);
};
export const SocketContextProvider = ({children}) => {

    const [socket,setSocket] = useState(null)
    const [onlineUsers,setOnlineUsers] = useState([])
    const {authUser} = useAuthContext()

    useEffect(() => {
            if (authUser){
                const s = io("https://buzz-talk-ra14.onrender.com/",{
                    query:{
                        userId : authUser._id
                    }
                }) 
                setSocket(s)

                s.on('getOnlineUsers',(users) => {
                    setOnlineUsers(users)
                })
                return () => s.close()
            }
            else{
                if(socket){
                    socket.close()
                    setSocket(null)
                }
            }
    },[authUser])

    return (
        <SocketContext.Provider value = {{socket,onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}
*/


import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		if (authUser) {
			const s = io("https://buzz-talk-ra14.onrender.com/", {
				query: {
					userId: authUser._id,
				},
			});
			setSocket(s);

			s.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => s.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);

	// Refactored: prevent new object creation on every render
	const contextValue = useMemo(() => ({ socket, onlineUsers }), [socket, onlineUsers]);

	return (
		<SocketContext.Provider
			// value={{ socket, onlineUsers }} // ❌ This causes the context value to change every render
			value={contextValue} // ✅ useMemo returns stable value unless dependencies change
		>
			{children}
		</SocketContext.Provider>
	);
};
