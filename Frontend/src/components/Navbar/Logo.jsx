import React from 'react'
import { Link } from 'react-router-dom'
import Home from '../../pages/Home'

function Logo() {
  return (
    <Link to= "/"><h1 className='md:text-3xl sm:text-sm'>
      BlogDamn<span className='text-primary font-semibold'>!</span>
    </h1></Link>
  )
}

export default Logo
