'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { login, setStoredUser, getStoredUser } from '@/lib/auth'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const user = getStoredUser()
    if (user) router.replace('/admin/dashboard')
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const user = login(username, password)
    if (!user) {
      setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
      return
    }
    setStoredUser(user)
    router.push('/admin/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #0B2540, #143354)' }}>
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#C9A84C' }}>
            <span className="text-2xl font-bold" style={{ color: '#0B2540' }}>E</span>
          </div>
          <h1 className="text-2xl font-bold" style={{ color: '#0B2540', fontFamily: 'var(--font-display)' }}>ECS Property Admin</h1>
          <p className="text-gray-400 text-sm mt-1">เข้าสู่ระบบจัดการทรัพย์สิน</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">ชื่อผู้ใช้</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">รหัสผ่าน</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
              required
            />
          </div>
          {error && <p className="text-xs text-red-sold font-medium">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#C9A84C', color: '#0B2540' }}
          >
            เข้าสู่ระบบ
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          ทดสอบ: <span className="font-mono">admin/admin</span> หรือ <span className="font-mono">user/1234</span>
        </p>
      </div>
    </div>
  )
}
