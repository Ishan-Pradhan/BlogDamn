import React from 'react'
import Header from '../../components/Navbar/Header'
import Button from '../../components/Button'
import { Link, NavLink } from 'react-router-dom'

function SignupPage() {
  return (
    <div>
      <Header/>
      <div className='container flex'>
        <div className='flex flex-col p-6 mx-auto mt-16 gap-6 border w-auto'>
          <div className='flex flex-col'>
<span className='text-xl font-bold uppercase tracking-wider'>Welcome Back,</span>
<p className='text-gray-700'>Please enter your details to log in.</p>
          </div>
          <input type="text" placeholder='Name' className='border border-gray-700 py-2 px-4 rounded-sm md:w-72' />
          <input type="text" placeholder='Email' className='border border-gray-700 py-2 px-4 rounded-sm md:w-72' />
          <input type="text" placeholder='Phone' className='border border-gray-700 py-2 px-4 rounded-sm md:w-72' />
          <input type='password' placeholder='Password' className='border border-gray-700 py-2 px-4 rounded-sm md:w-72'/>
          <Button color="primary" rounded="sm"> Sign Up</Button>
          <span>Already have an account? <NavLink to="/login"><span className='text-secondary underline'>Sign in</span></NavLink> </span>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
