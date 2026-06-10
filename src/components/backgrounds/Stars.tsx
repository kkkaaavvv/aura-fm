"use client"

export default function Stars() {
  const sparkles = Array.from({ length: 18 })

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      {sparkles.map((_, i) => (
        <div
          key={i}
          className="absolute text-white/70 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 16 + 10}px`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        >
          ✦
        </div>
      ))}

    </div>
  )
}