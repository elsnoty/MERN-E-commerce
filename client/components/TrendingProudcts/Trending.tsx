import React from 'react';
import TrendingDetails from './TendingDetails';
import Link from 'next/link';

const Trending = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">What&apos;s Trending Now</h1>
        <p className="text-lg text-gray-600 mb-12">
          Discover the latest products everyone is talking about! Stay ahead of the trends with our curated selection of popular items.
        </p>
        <TrendingDetails />
      </div>
      <div className='mt-7 text-center'>
        <Link 
        href={'/categories'} 
        className=" p-3 bg-black text-white font-bold hover:bg-slate-100 hover:text-black rounded-lg transition-colors duration-300" 
        >Browse More...</Link>
        </div>
    </section>
  );
};

export default Trending;
