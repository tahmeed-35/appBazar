import React, { useState, Suspense } from "react";
import { useLoaderData, Await } from "react-router";
import { LoadingFallback } from "../components/LoadingFallback";

function InstalledList({ initialApps }) {
  const storedIds = JSON.parse(localStorage.getItem("installedApps")) || [];
  const [apps, setApps] = useState(initialApps.filter(app => storedIds.includes(app.id)));
  const [sortOrder, setSortOrder] = useState("");

  const handleSort = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    if (order === "asc") {
      setApps([...apps].sort((a, b) => a.size - b.size));
    } else if (order === "desc") {
      setApps([...apps].sort((a, b) => b.size - a.size));
    }
  };

  const handleUninstall = (id) => {
    const updatedApps = apps.filter(app => app.id !== id);
    setApps(updatedApps);
    localStorage.setItem("installedApps", JSON.stringify(updatedApps.map(a => a.id)));
  };

  const formatDownloads = (num) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(0) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'k';
    return num;
  };

  return (
    <div className="max-w-[1024px] w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-slate-800 text-lg">{apps.length} Apps Found</h2>
        <select 
          className="select select-bordered select-sm w-40 text-slate-600 bg-transparent border-gray-300 focus:outline-none"
          value={sortOrder}
          onChange={handleSort}
        >
          <option value="" disabled>Sort By Size</option>
          <option value="asc">Size (Low to High)</option>
          <option value="desc">Size (High to Low)</option>
        </select>
      </div>

      <div className="flex flex-col gap-4">
        {apps.map(app => (
          <div key={app.id} className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.05)] border border-gray-100 gap-4 sm:gap-6">
            <div className="flex items-center gap-6 w-full sm:w-auto flex-grow">
              <div className="bg-gray-200 h-[85px] w-[85px] rounded-xl flex-shrink-0 flex items-center justify-center p-3 overflow-hidden">
                <img src={app.image} alt={app.title} className="max-h-full max-w-full object-contain drop-shadow-sm" />
              </div>
              <div className="flex flex-col items-start justify-center min-w-0">
                <h3 className="font-bold text-slate-800 text-[16px] truncate mb-2.5">{app.title}</h3>
                <div className="flex items-center gap-5 text-xs font-bold">
                  <span className="text-[#00d084] flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    {formatDownloads(app.downloads)}
                  </span>
                  <span className="text-[#f59e0b] text-[13px]">★ {app.ratingAvg}</span>
                  <span className="text-slate-400 font-medium ml-1">{app.size} MB</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => handleUninstall(app.id)}
              className="btn h-9 min-h-0 px-7 bg-[#00d084] hover:bg-[#00b874] text-white border-0 font-semibold w-full sm:w-auto tracking-wide rounded-md shadow-sm"
            >
              Uninstall
            </button>
          </div>
        ))}

        {apps.length === 0 && (
          <div className="text-center py-16 text-slate-500 bg-white rounded-xl shadow-sm border border-gray-100">
            No installed apps remaining.
          </div>
        )}
      </div>
    </div>
  );
}

function Installation() {
  const { appsPromise } = useLoaderData();

  return (
    <div className="py-16 bg-gray-50 min-h-screen px-4 flex flex-col items-center">
      <h1 className="text-[34px] font-extrabold text-[#0a192f] mb-3 mt-4 text-center tracking-tight">Your Installed Apps</h1>
      <p className="text-[#64748b] mb-12 text-center text-[15px]">Explore All Trending Apps on the Market developed by us</p>

      <Suspense fallback={<LoadingFallback />}>
        <Await resolve={appsPromise}>
          {(apps) => <InstalledList initialApps={apps} />}
        </Await>
      </Suspense>
    </div>
  );
}

export default Installation;
