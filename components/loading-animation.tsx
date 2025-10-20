export function LoadingAnimation() {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-4 border-t-primary border-r-4 border-r-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-primary font-mono text-sm">Loading...</span>
        </div>
      </div>
    </div>
  )
}


