import React, { useState, Suspense } from "react";
import { useLoaderData, Await } from "react-router";
import { LoadingFallback } from "../main";

function Apps() {
  const { appsPromise } = useLoaderData();
  const [search, setSearch] = useState("");

  const formatDownloads = (num) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(0) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'k';
    return num;
  };


  return (
    <div className="py-16 bg-gray-50 min-h-screen px-4 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 mt-4 text-center">Our All Applications</h1>
      <p className="text-slate-500 mb-10 text-center text-sm md:text-base">Explore All Apps on the Market developed by us. We code for Millions</p>

      <div className="max-w-[1100px] w-full">
        <Suspense fallback={<LoadingFallback />}>
          <Await resolve={appsPromise}>
            {(apps) => {
              const filteredApps = apps.filter(app => app.title.toLowerCase().includes(search.toLowerCase()));
              return (
                <>
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 border-b border-gray-200 pb-4">
                    <h2 className="font-bold text-slate-800 text-lg">({filteredApps.length}) Apps Found</h2>
                    <div className="form-control w-full sm:w-auto">
                      <label className="input input-bordered shadow-sm flex items-center gap-2 bg-white h-10 px-3 w-full sm:w-64">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-50"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                        <input type="text" className="grow text-sm" placeholder="search Apps" value={search} onChange={(e) => setSearch(e.target.value)} />
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                    {filteredApps.map((app) => (
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
                </>
              )
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default Apps;
