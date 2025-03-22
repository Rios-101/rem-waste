const SkipSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-gray-900 p-4 rounded-xl shadow-lg animate-pulse">
                    <div className="relative w-full h-40 bg-gray-800 rounded-lg"></div>
                    <div className="h-6 bg-gray-700 rounded mt-4 w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded mt-2 w-1/2"></div>
                    <div className="h-6 bg-gray-700 rounded mt-2 w-1/3"></div>
                    <button className="w-full py-2.5 md:py-3 px-4 rounded-md transition-all flex items-center justify-center space-x-2 bg-gray-800 text-white mt-4">
                        <span className="w-24 h-4 bg-gray-700 rounded"></span>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default SkipSkeleton;
