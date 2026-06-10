import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0B2540' }} className="text-white/70 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-gold flex items-center justify-center">
              <span className="text-navy font-bold text-xs">E</span>
            </div>
            <span className="text-white font-semibold">ECS Property Group</span>
          </div>
          <p className="text-sm leading-relaxed">ทรัพย์สินคัดสรร ที่ดินและโรงแรมพรีเมียมทั่วประเทศไทย</p>
        </div>
        <div>
          <h4 className="text-white font-medium mb-3 text-sm">ลิงก์ด่วน</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-gold transition-colors">หน้าแรก</Link></li>
            <li><Link href="/listings" className="hover:text-gold transition-colors">ทรัพย์สินทั้งหมด</Link></li>
            <li><Link href="/admin" className="hover:text-gold transition-colors">เข้าสู่ระบบ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-3 text-sm">ติดต่อ</h4>
          <p className="text-sm">โทร: 02-XXX-XXXX</p>
          <p className="text-sm mt-1">LINE: @ecsproperty</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/10 text-center text-xs">
        © {new Date().getFullYear()} ECS Property Group. All rights reserved.
      </div>
    </footer>
  )
}
