"use client"
import { SnackbarProvider } from 'notistack'
import React from 'react'

const Natfication = ({children}: {children: React.ReactNode}) => {
  return (
      <SnackbarProvider>
        {children}
      </SnackbarProvider>
  )
}

export default Natfication
