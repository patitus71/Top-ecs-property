'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { getStoredUser, clearStoredUser, type AuthUser } from '@/lib/auth'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    const stored = getStoredUser()
    if (!stored && pathname !== '/admin') {
      router.replace('/admin')
      return
    }
    setUser(stored)
  }, [pathname, router])

  // Login page — no shell
  if (pathname === '/admin') return <>{children}</>

  if (!user) return null

  const handleLogout = () => {
    clearStoredUser()
    router.push('/admin')
  }

  // Admin role — NO left nav, only top bar
  if (user.role === 'admin') {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#FAF8F4' }}>
        <div className="border-b border-gray-100 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-bold text-sm" style={{ color: '#0B2540' }}>ECS Admin</span>
              <nav className="hidden md:flex gap-4 ml-6">
                <Link href="/admin/dashboard" className={`text-sm ${pathname === '/admin/dashboard' ? 'font-semibold text-gold' : 'text-gray-500 hover:text-navy'}`}>แดชบอร์ด</Link>
                <Link href="/admin/land" className={`text-sm ${pathname === '/admin/land' ? 'font-semibold text-gold' : 'text-gray-500 hover:text-navy'}`}>ที่ดิน</Link>
                <Link href="/admin/hotel" className={`text-sm ${pathname === '/admin/hotel' ? 'font-semibold text-gold' : 'text-gray-500 hover:text-navy'}`}>โรงแรม</Link>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 hidden sm:block">👤 {user.username}</span>
              <button onClick={handleLogout} className="text-xs text-red-sold hover:underline">ออกจากระบบ</button>
            </div>
          </div>
        </div>
        <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
      </div>
    )
  }

  // Regular user — show left nav
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#FAF8F4' }}>
      <aside className="w-56 bg-white border-r border-gray-100 shadow-sm flex flex-col">
        <div className="p-5 border-b border-gray-50">
          <p className="font-bold text-sm" style={{ color: '#0B2540' }}>ECS Property</p>
          <p className="text-xs text-gray-400 mt-0.5">สวัสดี, {user.username}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { href: '/listings', icon: '🗺', label: 'แผนที่ประกาศ' },
            { href: '/favorites', icon: '❤️', label: 'รายการโปรด' },
            { href: '/contact', icon: '📞', label: 'ติดต่อเรา' },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors ${
                pathname === item.href
                  ? 'font-semibold'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              style={pathname === item.href ? { backgroundColor: '#C9A84C20', color: '#0B2540', fontWeight: 600 } : {}}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-50">
          <button onClick={handleLogout} className="w-full text-xs text-gray-400 hover:text-red-sold transition-colors text-left">ออกจากระบบ</button>
        </div>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
