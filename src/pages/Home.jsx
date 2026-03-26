import React, { Suspense } from "react";
import { Link, useLoaderData, Await } from "react-router";
import hero from "../assets/hero.png";
import { LoadingFallback } from "../main";

function Home() {
  const { appsPromise } = useLoaderData();

  const formatDownloads = (num) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(0) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'k';
    return num;
  };

  return (
    <div className="text-center pt-10 pb-0 flex flex-col items-center w-full">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 mt-8">
        We Build <br className="hidden md:block" />
        <span className="text-purple-500">Productive</span> Apps
      </h1>
      <p className="text-slate-500 mb-8 max-w-2xl px-4 text-sm md:text-base">
        At appBazar, we craft innovative apps designed to make everyday life simpler, smarter, and more exciting.
        Our goal is to turn your ideas into digital experiences that truly make an impact.
      </p>

      <div className="flex justify-center gap-4 mb-12">
        <button className="btn bg-white border border-gray-200 text-slate-700 shadow-sm hover:bg-gray-50 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> Google Play
        </button>
        <button className="btn bg-white border border-gray-200 text-slate-700 shadow-sm hover:bg-gray-50 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-slate-800"><path d="M16.9,13.7c0-2.3,1.9-3.4,2-3.4c-1.1-1.6-2.8-1.8-3.4-1.8c-1.5-0.1-2.9,0.9-3.7,0.9c-0.8,0-1.9-0.9-3.2-0.9c-1.6,0-3.1,1-4,2.5C2.6,14.5,4,19.2,5.7,21.6c0.8,1.2,1.8,2.5,3.1,2.5c1.2,0,1.7-0.7,3.1-0.7s1.9,0.7,3.1,0.7c1.3,0,2.1-1.1,2.9-2.3C18.4,20,19,18,19,18C19,17.9,16.9,17.2,16.9,13.7z M12.8,5.4C13.5,4.6,14,3.4,13.8,2.3C12.9,2.4,11.5,2.9,10.8,3.8c-0.6,0.7-1.1,1.9-1,3.1C11,7,12.1,6.3,12.8,5.4z"/></svg> App Store
        </button>
      </div>

      <div className="flex justify-center mb-0 w-full px-4 overflow-hidden max-w-2xl">
        <img src={hero} alt="App mockup" className="w-[80%] mx-auto object-cover translate-y-8" />
      </div>

      <div className="bg-purple-500 text-white py-16 w-full z-10 px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Trusted By Millions, Built For You</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-24 text-center">
          <div>
            <p className="text-sm opacity-90">Total Downloads</p>
            <h3 className="text-4xl md:text-5xl font-bold my-2">29.6M</h3>
            <p className="text-xs opacity-75">21% More Than Last Month</p>
          </div>
          <div>
            <p className="text-sm opacity-90">Total Reviews</p>
            <h3 className="text-4xl md:text-5xl font-bold my-2">906K</h3>
            <p className="text-xs opacity-75">44% More Than Last Month</p>
          </div>
          <div>
            <p className="text-sm opacity-90">Active Apps</p>
            <h3 className="text-4xl md:text-5xl font-bold my-2">132+</h3>
            <p className="text-xs opacity-75">31 More Will Launch</p>
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50 w-full px-4 text-center flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-2 text-slate-800">Trending Apps</h2>
        <p className="text-slate-500 mb-10 text-sm">Explore All Trending Apps on the Market developed by us</p>

        <Suspense fallback={<LoadingFallback />}>
          <Await resolve={appsPromise}>
            {(apps) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1100px] w-full">
                {apps.slice(0, 8).map((app) => (
                  <div key={app.id} className="card bg-white shadow-sm border border-gray-100 p-4 text-left rounded-xl">
                    <div className="bg-gray-100 h-[220px] w-full rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                       <img src={app.image} alt={app.title} className="max-h-full max-w-full object-contain p-4" />
                    </div>
                    <h3 className="font-bold text-sm truncate mb-1">{app.title}</h3>
                    <p className="text-xs text-gray-500 mb-3 truncate">{app.companyName}</p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="bg-green-100 text-green-600 px-2 py-1 rounded font-semibold flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        {formatDownloads(app.downloads)}
                      </span>
                      <span className="bg-yellow-50 text-orange-500 px-2 py-1 rounded font-bold flex items-center gap-1">
                        ★ {app.ratingAvg}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Await>
        </Suspense>

        <Link to="/apps" className="btn bg-purple-500 hover:bg-purple-600 text-white mt-12 border-0 px-8">
          Show All
        </Link>
      </div>
    </div>
  )
}

export default Home;
