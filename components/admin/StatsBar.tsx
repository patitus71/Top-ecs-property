type Stat = { label: string; value: string | number; color?: string }

export default function StatsBar({ stats }: { stats: Stat[] }) {
  return (
    <div className="flex flex-wrap gap-3 mb-4">
      {stats.map(s => (
        <div key={s.label} className="bg-white border border-gray-100 rounded-xl px-5 py-3 shadow-sm flex items-center gap-3">
          <div>
            <p className="text-xs text-gray-400">{s.label}</p>
            <p className={`text-xl font-bold ${s.color ?? 'text-navy'}`}>{s.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
