'use client'

type Props = {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  onSearch?: () => void
  dark?: boolean
}

export default function SearchBar({ value, onChange, placeholder = 'ค้นหาทรัพย์สิน...', onSearch, dark = false }: Props) {
  return (
    <div className={`flex rounded-full overflow-hidden shadow-lg ${dark ? 'bg-white/10 border border-white/20' : 'bg-white border border-gray-200'}`}>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        onKeyDown={e => e.key === 'Enter' && onSearch?.()}
        className={`flex-1 px-5 py-3 text-sm outline-none bg-transparent ${dark ? 'text-white placeholder:text-white/50' : 'text-gray-800 placeholder:text-gray-400'}`}
      />
      <button
        onClick={onSearch}
        className="px-6 py-3 bg-gold text-navy font-semibold text-sm hover:bg-gold-light transition-colors"
      >
        ค้นหา
      </button>
    </div>
  )
}
