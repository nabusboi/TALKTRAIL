import React from 'react'
import {useAuthContext} from '../../context/AuthContext'
import useConversations from '../../zustand/useConversations'
import { extractTime } from '../../utils/extractTime'

const Message = ({message}) => {
  
  const {authUser}= useAuthContext()
  const {selectedConversation} = useConversations()

  const fromMe = message.senderId === authUser._id
  const chatClassName = fromMe ? "chat-end" : "chat-start"
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic
  const bubbleBG = fromMe ? "bg-blue-500" : "bg-gray-700"

  return (
    <div className={`chat ${chatClassName}`}>
        <div className='chat-image avatar'>
            <div className='w-12 rounded-full'>
                <img src={profilePic} alt="user avatar" />
            </div>
        </div>
        <div className={`chat-bubble text-white bg-blue-500 ${bubbleBG}`}>{message.message}</div>
        <time className="text-xs opacity-50">{extractTime(message.createdAt)}</time>
    </div>
  )
}

export default Message
