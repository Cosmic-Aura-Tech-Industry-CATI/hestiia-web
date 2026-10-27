export default function SectionDivider({ className = '' }: { className?: string }) {
  return (
    <div
      className={`section-divider ${className}`}
      aria-hidden="true"
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px',
        height: '1px',
        position: 'relative',
        backgroundColor: '#191410',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 'var(--container-max, 1240px)',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(184, 154, 100, 0.22) 50%, transparent 100%)',
          position: 'relative',
        }}
      />
    </div>
  )
}
