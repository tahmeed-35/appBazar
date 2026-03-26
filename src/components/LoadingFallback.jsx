export const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center w-full min-h-[40vh] py-16">
    <span className="loading loading-spinner loading-lg text-purple-500 h-16 w-16"></span>
    <p className="mt-4 font-bold text-slate-500 animate-pulse text-lg">Loading AppBazar Data...</p>
  </div>
);
