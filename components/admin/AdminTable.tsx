'use client'

type Column<T> = {
  key: keyof T
  label: string
  render?: (val: unknown, row: T) => React.ReactNode
  className?: string
}

type Props<T> = {
  columns: Column<T>[]
  data: T[]
  onEdit: (row: T) => void
  onDelete: (row: T) => void
  rowKey: keyof T
}

export default function AdminTable<T>({ columns, data, onEdit, onDelete, rowKey }: Props<T>) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-navy text-white text-left">
            {columns.map(col => (
              <th key={String(col.key)} className={`px-4 py-3 font-medium whitespace-nowrap ${col.className ?? ''}`}>
                {col.label}
              </th>
            ))}
            <th className="px-4 py-3 font-medium">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={String(row[rowKey])}
              className={`border-t border-gray-50 hover:bg-gold/5 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
            >
              {columns.map(col => (
                <td key={String(col.key)} className={`px-4 py-3 whitespace-nowrap ${col.className ?? ''}`}>
                  {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                </td>
              ))}
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(row)}
                    className="px-3 py-1 text-xs bg-gold/10 rounded-lg hover:bg-gold/20 transition-colors font-medium" style={{ color: '#7a5c1e' }}
                  >แก้ไข</button>
                  <button
                    onClick={() => onDelete(row)}
                    className="px-3 py-1 text-xs bg-red-50 text-red-sold rounded-lg hover:bg-red-100 transition-colors font-medium"
                  >ลบ</button>
                </div>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-12 text-gray-400">ไม่พบข้อมูล</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
