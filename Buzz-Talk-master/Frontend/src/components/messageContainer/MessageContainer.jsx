import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import useConversations from "../../zustand/useConversations";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
  const {selectedConversation,setSelectedConversation} = useConversations()
  
  useEffect(() => {
    return () => {
      setSelectedConversation(null)
    }
  },[setSelectedConversation])
  return (
    <div className="w-[70%] flex flex-col">
      {!selectedConversation ? <NochatSelected/> :(
      <>
      <div className="bg-[#374151] px-4 py-2 mb-2 flex">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src={selectedConversation.profilePic} alt="user avatar"/>
          </div>
        </div>
        <div className="mx-2">
          <p className="text-lg text-white">{selectedConversation.fullName}</p>
          <p className="text-xs text-slate-400">Online</p>
        </div>
      </div>
      <Messages />
      <MessageInput />
    </>
    )}
    </div>
  );
};

export default MessageContainer;

const NochatSelected = () =>{
  const {authUser}  = useAuthContext()
  return(
    <div className="flex items-center justify-center w-full h-full"> 
      <div className="px-4 text-center text-xl text-gray-200 font-semibold flex flex-col items-center gap-2 w-full">
        <p>Welcome 👋 {authUser.fullName}</p>
        <TiMessages className="text-6xl text-center"/>
      </div>
    </div>
  )
}
