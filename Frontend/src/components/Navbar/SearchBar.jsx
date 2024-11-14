import React, { useState } from 'react'

function SearchBar() {
  const[isClicked, setIsClicked] = useState(false)

  const onToggle = () => {
    setIsClicked(prevState => !prevState); 
  };
  return (
    <div className={isClicked ? 'absolute bg-gray-100  top-0 left-0 w-full flex justify-center items-center h-14 px-' :'relative w-auto border h-auto border-line bg-gray-100 rounded px-2 md:w-80  flex items-center md:h-8 justify-between group focus-within:border-2 focus-within:border-black'}>
     
        <input
          className= {` ${isClicked? 'flex' : "hidden"} md:flex bg-gray-100 focus-within:outline-none w-full `}
          placeholder="Search"
          type='text'
        />
   
 <i className={`fa-solid md:pointer-events-none  ${isClicked ? 'fa-times px-6 text-2xl ' : 'fa-search'} text-gray-500`}  onClick={onToggle} disable></i>
       
    </div>
  )
}

export default SearchBar
