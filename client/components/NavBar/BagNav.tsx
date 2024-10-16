'use client'
import React from 'react'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useCart } from '@/hooks/UseCart'

const BagNav = () => {
    const cartLength = useCart()
  return (
    <Link href={'/cart'} className='flex items-center'>
    <FontAwesomeIcon icon={faBagShopping} size='xl' className='cursor-pointer text-gray-700 hover:bg-black w-5 h-5 rounded-full p-2'/>
    <span className="cart-count">({cartLength.length})</span>
  </Link>
  )
}
export default BagNav