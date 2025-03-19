import { useEffect } from "react"
import { useSocketContext } from "../context/SocketContext"
import useConversations from "../zustand/useConversations"
import notificationSound from "../assets/sound/notification.mp3"

const useListenMessages = () => {
    const {socket} = useSocketContext()
    const {selectedConversation,messages,setMessages} = useConversations()

    useEffect(() => {
        socket?.on('newMessage',(newMessage) => {
            // console.log(newMessage,selectedConversation)
            if(newMessage.senderId === selectedConversation?._id){
                setMessages([...messages,newMessage])
            }
            // setMessages([...messages,newMessage])
            const sound = new Audio(notificationSound)
            sound.play()
        })
        return () => socket.off('newMessage')
    },[socket,setMessages,messages])
}

export default useListenMessages
