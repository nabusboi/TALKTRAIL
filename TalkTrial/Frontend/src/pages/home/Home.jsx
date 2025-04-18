import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar.jsx'
import MessageContainer from '../../components/messageContainer/MessageContainer.jsx'

const Home = () => {
  return (
    <div className='flex w-[80%] h-[90%] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0'>
        <Sidebar/>
        <MessageContainer/>
    </div>
  )
}

export default Home
