

export const FloatingShapes = () => {
    return (
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-purple-500/20 blur-xl floating"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-blue-500/20 blur-xl floating-2"></div>
        <div className="absolute bottom-1/4 right-1/3 w-28 h-28 rounded-full bg-pink-500/20 blur-xl floating-3"></div>
      </div>
    )
  }