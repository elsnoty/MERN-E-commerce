import React from 'react'

export default function Loader (){
    return (
      <div
        className="max-w-[310px] p-3 animate-pulse bg-gray-200 h-[400px] rounded-md"
      >
        <div className="h-48 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
      </div>
)
}


