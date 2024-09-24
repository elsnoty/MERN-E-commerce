import React from 'react'
import Navbar from './Links'
import SearchComponent from './Search'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import SideMenu from './SideMenu'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'


const Nav = () => {
  return (
    <div className='flex justify-between bg-white/40 shadow-xl items-center px-10 max-md:py-4 lg:px-20'>
      <div className='flex gap-1 items-center'>
        <Link href={'/'}>GW STORE</Link>
        <Navbar className='max-md:hidden flex items-center'/>
      </div>
      <div className='flex gap-3 items-center'>
      <SearchComponent />
        <Link href={'/cart'}>
          <FontAwesomeIcon icon={faBagShopping} size='xl' className='cursor-pointer hover:bg-gray-500 w-5 h-5 rounded-full p-2'/>
        </Link>
        <Link href={'/orders'} >orders</Link>
        <SideMenu className='md:hidden'/>
      </div>
    </div>
  )
}

export default Nav
