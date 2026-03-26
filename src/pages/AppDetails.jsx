import React, { useState, Suspense, useEffect } from "react";
import { useLoaderData, useParams, Await } from "react-router";
import { LoadingFallback } from "../components/LoadingFallback";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function DetailsContent({ initialApps }) {
  const { id } = useParams();
  const app = initialApps.find(a => a.id.toString() === id);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const installed = JSON.parse(localStorage.getItem("installedApps")) || [];
    setIsInstalled(installed.includes(app?.id));
  }, [app]);

  if (!app) return <div className="text-center py-20 text-xl font-bold text-slate-800">App Not Found</div>;

  const handleInstall = () => {
    const installed = JSON.parse(localStorage.getItem("installedApps")) || [];
    if (!installed.includes(app.id)) {
      installed.push(app.id);
      localStorage.setItem("installedApps", JSON.stringify(installed));
      setIsInstalled(true);
    }
  };

  const formatDownloads = (num) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(0) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(0) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num;
  };

  const formatReviews = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(0) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num;
  };

  // Recharts needs an array of objects for the rating bar chart
  let chartData = [];
  if (app.ratings) {
     chartData = app.ratings.slice().reverse().map(r => ({
       name: r.name,
       count: r.count
     }));
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 flex flex-col items-center">
      <div className="max-w-[1000px] w-full bg-white rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.05)] border border-gray-100 p-6 md:p-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mb-10 border-b border-gray-100 pb-10">
          <div className="bg-gray-50 h-48 w-48 rounded-2xl flex items-center justify-center p-6 border border-gray-200 flex-shrink-0">
             <img src={app.image} alt={app.title} className="max-h-full max-w-full drop-shadow-sm" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">{app.title}</h1>
            <p className="text-[#64748b] mb-8 text-sm md:text-base">Developed by <span className="font-bold text-purple-600 cursor-pointer">{app.companyName.toLowerCase().replace(/,.*/, '').replace(/ /g, '.')}</span></p>
            
            <div className="flex gap-6 md:gap-10 mb-8 flex-wrap">
              <div>
                <p className="text-xs md:text-sm text-slate-500 mb-1 flex items-center gap-1 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#00d084]"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  Downloads
                </p>
                <h3 className="text-2xl md:text-[28px] font-bold text-slate-800">{formatDownloads(app.downloads)}</h3>
              </div>
              <div>
                <p className="text-xs md:text-sm text-slate-500 mb-1 flex items-center gap-1 font-medium">
                  <span className="text-orange-400 text-lg leading-none">★</span>
                  Average Ratings
                </p>
                <h3 className="text-2xl md:text-[28px] font-bold text-slate-800">{app.ratingAvg}</h3>
              </div>
              <div>
                <p className="text-xs md:text-sm text-slate-500 mb-1 flex items-center gap-1 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  Total Reviews
                </p>
                <h3 className="text-2xl md:text-[28px] font-bold text-slate-800">{formatReviews(app.reviews)}</h3>
              </div>
            </div>
            
            <button 
              onClick={handleInstall}
              disabled={isInstalled}
              className={`btn px-8 border-0 font-bold h-12 text-[15px] max-w-xs transition-all ${isInstalled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-[#00d084] hover:bg-[#00b370] text-white'}`}
            >
              {isInstalled ? 'Installed' : `Install Now (${app.size} MB)`}
            </button>
          </div>
        </div>

        {/* Ratings Section with Recharts */}
        <div className="mb-12 border-b border-gray-100 pb-10">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Ratings</h2>
          <div className="h-64 w-full text-sm font-medium">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13}} width={50} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="count" fill="#f97316" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Description Section */}
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4">Description</h2>
          <div className="text-[#64748b] leading-relaxed text-[15px] space-y-5">
            <p>{app.description}</p>
            <p>
              A unique feature of this app is the integration of its features into your daily workflow. The built-in analytics show not only how much you've utilized it but also which components consumed the most resources. This allows you to reflect on your efficiency and adjust your usage accordingly. The design is minimal and calming, reducing cognitive load so you can focus entirely on the task at hand.
            </p>
            <p>
              For people who struggle with modern workflows, the app provides a tailored approach to success. By combining intuitive design with smart algorithms, this app ensures that you not only work harder but also smarter. It is a personal assistant for your device, keeping you refreshed and productive throughout the day.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

function AppDetails() {
  const { appsPromise } = useLoaderData();

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Await resolve={appsPromise}>
        {(apps) => <DetailsContent initialApps={apps} />}
      </Await>
    </Suspense>
  );
}

export default AppDetails;
