import React from 'react'
import style from '../categories/[id]/style.module.css'

export default function Loading() {
  return (
    <div className={`${style.LoaderContainer}`}>
    <span className={`${style.loader}`}></span>
  </div>
  )
}


