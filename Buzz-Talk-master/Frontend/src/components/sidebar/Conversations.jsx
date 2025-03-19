import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../Hooks/useGetConversations.js'

const Conversations = () => {
  const {loading,conversations} = useGetConversations()
  return (
    <div className='flex flex-col overflow-auto h-[72%] scroll-smooth no-scrollbar'>
      {conversations.filteredUsers && conversations.filteredUsers.map((conversation,idx) => (
        <Conversation 
        key={conversation._id}
        conversation = {conversation}
        lastIdx = {idx === conversations.length-1}/>
      ))}

      {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  )
}

export default Conversations
