import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../Hooks/useLogin'

const Login = () => {

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [loading,login] = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    login(username,password)
  }

  return (
    <div className='flex flrex-col item-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
            Login <span className='text-blue-500'>TALKTRAIL</span>
        </h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label className='label'>
                    <span className='text-base lebel-text text-white'>Username</span>
                </label>
                <input type="text" placeholder='Username' className='w-full input input-bordered h-10' 
                value={username} 
                onChange={(e) => {setUsername(e.target.value)}}/>
            </div>
            <div>
                <label className='label'>
                    <span className='text-base lebel-text text-white'>Password</span>
                </label>
                <input type="password" placeholder='Password' className='w-full input input-bordered h-10'
                value = {password}
                onChange={(e) => {setPassword(e.target.value)}}/>
            </div>
            <div>
                <button className="btn btn-block btn-sm h-10 mt-5">
                  { loading? <span className='loading loading-spinner'/>:"Login"}
                </button>
            </div>
            <Link to="/signup" className='text-sm hover:underline hover:text-white mt-2 block text-center text-white'>
                "Don't" have an account? 
            </Link>
        </form>
      </div>
    </div>
  )
}

export default Login
