import { createContext, useContext, useEffect, useState } from "react";
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