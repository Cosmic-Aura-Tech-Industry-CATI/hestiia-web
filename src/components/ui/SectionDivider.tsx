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
          maxWidth: '1200px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(184, 154, 100, 0.22) 50%, transparent 100%)',
          position: 'relative',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(45deg)',
            width: '5px',
            height: '5px',
            backgroundColor: 'var(--color-brass, #B89A64)',
            opacity: 0.6,
          }}
        />
      </div>
    </div>
  )
}
