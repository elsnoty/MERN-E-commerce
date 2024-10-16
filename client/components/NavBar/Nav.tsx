import React from 'react'
import Navbar from './Links'
import SearchComponent from './Search'
import Link from 'next/link'
import SideMenu from './SideMenu'
import AuthNav from './AuthNav'
import BagNav from './BagNav'


const Nav = () => {

  return (
    <div className='flex gap-2 justify-between bg-white/40 shadow-xl items-center px-10 max-sm:px-4 max-md:py-4 lg:px-20'>
      <div className='flex gap-1 items-center'>
        <Link href={'/'} className='text-black font-RubikMonoOne font-bold sm:text-3xl'>
          ELSNOTY
        </Link>
        <Navbar className='max-md:hidden flex items-center'/>
      </div>
      <div className='flex gap-2 items-center'>
      <SearchComponent />
      <BagNav />
        <AuthNav className='max-md:hidden flex items-center gap-1' />
        <SideMenu className='md:hidden'/>
      </div>
    </div>
  )
}

export default Nav
