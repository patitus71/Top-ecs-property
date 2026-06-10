'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-navy shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
              <span className="text-navy font-bold text-sm">E</span>
            </div>
            <span className="text-white font-semibold text-lg tracking-wide">ECS Property</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-white/80 hover:text-gold transition-colors text-sm">หน้าแรก</Link>
            <Link href="/listings" className="text-white/80 hover:text-gold transition-colors text-sm">ทรัพย์สินทั้งหมด</Link>
            <Link href="/admin" className="ml-4 px-4 py-1.5 border border-gold text-gold rounded-full text-sm hover:bg-gold hover:text-navy transition-all">เข้าสู่ระบบ</Link>
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-0.5 bg-current mb-1" />
            <div className="w-5 h-0.5 bg-current mb-1" />
            <div className="w-5 h-0.5 bg-current" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-navy border-t border-white/10 px-4 py-4 flex flex-col gap-4">
          <Link href="/" className="text-white/80 text-sm" onClick={() => setMenuOpen(false)}>หน้าแรก</Link>
          <Link href="/listings" className="text-white/80 text-sm" onClick={() => setMenuOpen(false)}>ทรัพย์สินทั้งหมด</Link>
          <Link href="/admin" className="text-gold text-sm" onClick={() => setMenuOpen(false)}>เข้าสู่ระบบ</Link>
        </div>
      )}
    </nav>
  )
}
