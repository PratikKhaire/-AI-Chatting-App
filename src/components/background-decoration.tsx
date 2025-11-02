"use client";

export function BackgroundDecoration() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Animated SVG Lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="line-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(262, 83%, 58%)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="hsl(280, 80%, 65%)" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="line-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(220, 100%, 70%)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="hsl(262, 83%, 58%)" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="line-gradient-3" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="hsl(280, 100%, 70%)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="hsl(220, 100%, 70%)" stopOpacity="0.03" />
          </linearGradient>
        </defs>

        {/* Curved flowing lines */}
        <g className="animate-float-slow">
          <path
            d="M -100 300 Q 200 100, 500 200 T 1000 300 T 1500 200"
            stroke="url(#line-gradient-1)"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M -100 350 Q 250 150, 500 250 T 1000 350 T 1500 250"
            stroke="url(#line-gradient-1)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.4"
          />
        </g>

        <g className="animate-float-medium">
          <path
            d="M 1920 200 Q 1600 400, 1300 300 T 800 200 T 300 300"
            stroke="url(#line-gradient-2)"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M 1920 250 Q 1550 450, 1300 350 T 800 250 T 300 350"
            stroke="url(#line-gradient-2)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.4"
          />
        </g>

        <g className="animate-float-fast">
          <path
            d="M 960 -50 Q 800 300, 960 500 T 960 900 T 960 1200"
            stroke="url(#line-gradient-3)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.5"
          />
          <path
            d="M 1000 -50 Q 1150 300, 1000 500 T 1000 900 T 1000 1200"
            stroke="url(#line-gradient-3)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.5"
          />
        </g>

        {/* Decorative circles */}
        <g className="animate-pulse-slow">
          <circle cx="20%" cy="30%" r="150" fill="url(#line-gradient-1)" opacity="0.03" />
          <circle cx="20%" cy="30%" r="100" fill="none" stroke="url(#line-gradient-1)" strokeWidth="1" opacity="0.1" />
        </g>

        <g className="animate-pulse-medium" style={{ animationDelay: '1s' }}>
          <circle cx="80%" cy="60%" r="180" fill="url(#line-gradient-2)" opacity="0.03" />
          <circle cx="80%" cy="60%" r="120" fill="none" stroke="url(#line-gradient-2)" strokeWidth="1" opacity="0.1" />
        </g>

        <g className="animate-pulse-fast" style={{ animationDelay: '2s' }}>
          <circle cx="50%" cy="80%" r="120" fill="url(#line-gradient-3)" opacity="0.03" />
          <circle cx="50%" cy="80%" r="80" fill="none" stroke="url(#line-gradient-3)" strokeWidth="1" opacity="0.1" />
        </g>

        {/* Grid pattern */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(0, 0%, 85%)" strokeWidth="0.5" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-200/30 via-blue-200/20 to-transparent rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-200/30 via-purple-200/20 to-transparent rounded-full blur-3xl animate-pulse-medium" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-100/20 via-pink-100/10 to-transparent rounded-full blur-3xl animate-pulse-fast" style={{ animationDelay: '0.5s' }} />
    </div>
  );
}
