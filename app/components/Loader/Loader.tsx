import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-scree">
      {/* Logo Text */}
      <div className="mb-8 relative">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
          CodeGuru
        </h1>
        {/* Glow effect under text */}
        <div className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 blur-sm" />
        <div className="absolute -bottom-2 left-0 right-0 h-[1px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" />
      </div>

      {/* Enhanced Rotating Square Grid */}
      <div className="relative">
        {/* Outer glow effect */}
        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse" />

        {/* Main grid container */}
        <div className="relative grid grid-cols-2 gap-2 w-24 h-24 animate-spin">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="group relative"
            >
              {/* Background glow */}
              <div className="absolute inset-0 bg-cyan-500/50 blur-md rounded-lg group-hover:bg-purple-500/50 transition-colors duration-300" />

              {/* Main square */}
              <div
                className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 animate-pulse hover:from-purple-400 hover:via-pink-500 hover:to-cyan-600 transition-all duration-300"
                style={{
                  animationDelay: `${i * 0.15}s`,
                  transform: `rotate(${i * 90}deg)`
                }}
              >
                {/* Inner design */}
                <div className="absolute inset-1 rounded-md bg-gray-900/30 backdrop-blur-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Loading text */}
      <div className="mt-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse">
        Đang tải
      </div>

      {/* Custom animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default Loader;