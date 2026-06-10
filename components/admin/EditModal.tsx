'use client'

import { useState, useEffect } from 'react'

type FieldDef = {
  key: string
  label: string
  type?: 'text' | 'number' | 'select' | 'boolean'
  options?: string[]
}

type Props = {
  isOpen: boolean
  title: string
  fields: FieldDef[]
  initialData: Record<string, unknown>
  onSave: (data: Record<string, unknown>) => Promise<void>
  onClose: () => void
}

export default function EditModal({ isOpen, title, fields, initialData, onSave, onClose }: Props) {
  const [data, setData] = useState<Record<string, unknown>>(initialData)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)

  useEffect(() => { setData(initialData) }, [initialData])

  if (!isOpen) return null

  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave(data)
      setToast({ msg: 'บันทึกสำเร็จ', ok: true })
      setTimeout(() => { setToast(null); onClose() }, 1200)
    } catch {
      setToast({ msg: 'เกิดข้อผิดพลาด', ok: false })
      setTimeout(() => setToast(null), 2000)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />
      <div className="w-full max-w-md bg-white shadow-2xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-navy text-lg">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl leading-none">&times;</button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {fields.map(f => (
            <div key={f.key}>
              <label className="block text-xs font-medium text-gray-500 mb-1">{f.label}</label>
              {f.type === 'select' ? (
                <select
                  value={String(data[f.key] ?? '')}
                  onChange={e => setData(d => ({ ...d, [f.key]: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gold"
                >
                  {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : f.type === 'boolean' ? (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(data[f.key])}
                    onChange={e => setData(d => ({ ...d, [f.key]: e.target.checked }))}
                    className="w-4 h-4 accent-gold"
                  />
                  <span className="text-sm text-gray-600">มี</span>
                </label>
              ) : (
                <input
                  type={f.type === 'number' ? 'number' : 'text'}
                  value={String(data[f.key] ?? '')}
                  onChange={e => setData(d => ({ ...d, [f.key]: f.type === 'number' ? Number(e.target.value) : e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gold"
                />
              )}
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 bg-gold text-navy font-semibold py-2.5 rounded-xl hover:bg-gold-light disabled:opacity-50 transition-colors text-sm"
          >
            {saving ? 'กำลังบันทึก...' : 'บันทึก'}
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >ยกเลิก</button>
        </div>
        {toast && (
          <div className={`absolute bottom-20 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg text-sm font-medium text-white shadow-lg ${toast.ok ? 'bg-green-property' : 'bg-red-sold'}`}>
            {toast.msg}
          </div>
        )}
      </div>
    </div>
  )
}
