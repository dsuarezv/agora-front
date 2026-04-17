/** Bloque rectangular con animación pulse */
export function SkeletonBlock({ className = '' }) {
  return (
    <div className={`bg-surface-container-high animate-pulse rounded ${className}`} />
  )
}

/** Esqueleto completo de la página de detalle de boletín */
export function DetailSkeleton() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto">
      {/* Badges */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <SkeletonBlock className="h-6 w-40" />
        <SkeletonBlock className="h-6 w-36" />
        <SkeletonBlock className="h-6 w-20" />
      </div>

      {/* Community label + Title */}
      <SkeletonBlock className="h-4 w-48 mb-3" />
      <SkeletonBlock className="h-16 w-full mb-3" />
      <SkeletonBlock className="h-16 w-4/5 mb-8" />

      {/* Meta row */}
      <SkeletonBlock className="h-10 w-full mb-8" />

      {/* Italic subtitle */}
      <SkeletonBlock className="h-8 w-3/4 mb-4" />
      <SkeletonBlock className="h-8 w-2/3 mb-16" />

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-10">
          {/* Impact cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SkeletonBlock className="h-48 rounded-xl" />
            <SkeletonBlock className="h-48 rounded-xl" />
          </div>

          {/* Key points */}
          <SkeletonBlock className="h-6 w-64 mb-6" />
          <SkeletonBlock className="h-48 rounded-xl" />

          {/* Procedures */}
          <SkeletonBlock className="h-6 w-72 mb-6" />
          <SkeletonBlock className="h-64 rounded-xl" />
          <SkeletonBlock className="h-48 rounded-xl" />
        </div>

        <div className="lg:col-span-4 space-y-8">
          <SkeletonBlock className="h-52 rounded-xl" />
          <SkeletonBlock className="h-72 rounded-xl" />
        </div>
      </div>

      {/* Legal context */}
      <SkeletonBlock className="h-6 w-64 mt-20 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => <SkeletonBlock key={i} className="h-12 rounded-lg" />)}
        </div>
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => <SkeletonBlock key={i} className="h-8" />)}
        </div>
      </div>
    </div>
  )
}
