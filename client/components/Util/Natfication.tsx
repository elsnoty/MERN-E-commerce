"use client"
import { SnackbarProvider } from 'notistack'
import React from 'react'

const Natfication = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      <SnackbarProvider>
        {children}
      </SnackbarProvider>
    </div>
  )
}

export default Natfication
