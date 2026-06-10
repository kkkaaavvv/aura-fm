type ScrapbookCardProps = {
  text: string
  className?: string
}

export default function ScrapbookCard({
  text,
  className,
}: ScrapbookCardProps) {
  return (
    <div
      className={`
        absolute
        border border-white/10
        bg-white/5
        px-4
        py-3
        text-sm
        uppercase
        tracking-[0.2em]
        text-[#dfbbca]
        backdrop-blur-sm
        shadow-[0_0_30px_rgba(0,0,0,0.4)]
        ${className}
      `}
    >
      {text}
    </div>
  )
}