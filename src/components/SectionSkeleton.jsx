/**
 * Lightweight placeholder shown while a lazy-loaded section is being fetched.
 * Matches the dark theme so there's no visual jump on hydration.
 */
export default function SectionSkeleton({ minHeight = 320 }) {
  return (
    <div
      aria-hidden
      style={{
        minHeight,
        width: '100%',
        background:
          'linear-gradient(180deg, transparent 0%, rgba(139,92,246,0.04) 50%, transparent 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: '50%',
          border: '2px solid rgba(139,92,246,0.2)',
          borderTopColor: '#a78bfa',
          animation: 'sectionSkeletonSpin 0.9s linear infinite',
        }}
      />
      <style>{`
        @keyframes sectionSkeletonSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
