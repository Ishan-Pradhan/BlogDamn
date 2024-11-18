import React from 'react'
import Logo from './Logo'
import { Link, NavLink } from 'react-router-dom'
import SearchBar from './SearchBar'
import Button from '../Button'

function Header() {
  return (
    <nav className='border bg-white border-b-line py-2  mx-auto sticky top-0 ' style={{zIndex:1000}}>
     <div className="container h-10 flex justify-between items-center">
    <Logo/>
    <div className='flex gap-4'>
    <SearchBar/>
    <Button  view='small' color="primary">Login</Button>
    </div>
    <div className='hidden md:flex gap-4'>
    <Link to="/CreateBlog"><Button color="secondary" icon = {"fa-plus"}>Create</Button></Link>
    <Link to="/login"><Button color="primary">Log in</Button></Link>
    </div>
     </div>
    </nav>
  )
}

export default Header
