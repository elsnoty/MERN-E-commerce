"use client"
import React, { useState } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const ReactQueryProvider = ({children}: {children: React.ReactNode}) => {
    const [queryClient]= useState(()=> new QueryClient())
  return (
    <div>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false}/>
            {children}
      </QueryClientProvider>
    </div>
  )
}

export default ReactQueryProvider
