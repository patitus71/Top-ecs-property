export type LandPlot = {
  no: number
  site: string
  team: string
  province: string
  zoning: string
  rai: number
  ngan: number
  sqwa: number
  totalSqwa: number
  pricePerSqwa: number
  totalMB: number
  status: 'Remained' | 'SOLD'
  permits: string
  hasPresentation: boolean
  hasCanva: boolean
  lat?: number
  lng?: number
}

export type Hotel = {
  no: number
  project: string
  team: string
  province: string
  price: string
  towers: number
  storeys: number
  keys: number | string
  facilities: string
  type: 'FREEHOLD' | 'LEASEHOLD'
  rai: number
  ngan: number
  sqwa: number
  totalSqwa: number
  permits: string
  status: 'Remained' | 'SOLD'
  lat?: number
  lng?: number
}

export function formatMB(mb: number): string {
  return mb.toFixed(2).replace(/\.00$/, '') + ' MB'
}

export function formatSqwa(sqwa: number): string {
  return sqwa.toLocaleString() + ' ตร.วา'
}

export const LAND_DATA: LandPlot[] = [
  { no:1, site:'Krungthep - Kreetha', team:'กลุ่ม 3 พี่เต๋า', province:'Bangkok', zoning:'Yor. 3', rai:7, ngan:2, sqwa:74, totalSqwa:3074, pricePerSqwa:160000, totalMB:491.84, status:'Remained', permits:'', hasPresentation:true, hasCanva:true, lat:13.7234, lng:100.5905 },
  { no:2, site:'La Salle 83', team:'กลุ่ม 3 พี่เต๋า', province:'Bangkok', zoning:'Yor. 4', rai:7, ngan:3, sqwa:12.7, totalSqwa:3112.7, pricePerSqwa:275000, totalMB:855.99, status:'Remained', permits:'EIA Approved (Condo)', hasPresentation:true, hasCanva:true, lat:13.7190, lng:100.5700 },
  { no:3, site:'Ramkhamhaeng 142', team:'กลุ่ม 3 พี่เต๋า', province:'Bangkok', zoning:'Yor. 3', rai:10, ngan:1, sqwa:66.4, totalSqwa:4166.4, pricePerSqwa:142000, totalMB:591.63, status:'Remained', permits:'', hasPresentation:true, hasCanva:true, lat:13.7600, lng:100.6500 },
  { no:4, site:'Suwinthawong', team:'กลุ่ม 3 พี่เต๋า', province:'Bangkok', zoning:'Por.3', rai:5, ngan:3, sqwa:6.4, totalSqwa:2306.4, pricePerSqwa:175000, totalMB:403.62, status:'Remained', permits:'', hasPresentation:true, hasCanva:true, lat:13.7900, lng:100.7200 },
  { no:5, site:'Nimitmai', team:'กลุ่ม 3 พี่เต๋า', province:'Bangkok', zoning:'Yor. 2', rai:37, ngan:1, sqwa:18, totalSqwa:14918, pricePerSqwa:33500, totalMB:499.75, status:'Remained', permits:'', hasPresentation:true, hasCanva:true, lat:13.8100, lng:100.7800 },
  { no:6, site:'Bangwa Interchange', team:'กลุ่ม 6 พี่ประสิทธิ์', province:'Bangkok', zoning:'Yor.9', rai:4, ngan:1, sqwa:45.8, totalSqwa:1745.8, pricePerSqwa:390000, totalMB:680.86, status:'Remained', permits:'EIA Approved (Condo)', hasPresentation:true, hasCanva:true, lat:13.7050, lng:100.4300 },
  { no:7, site:'Bangkuntian', team:'กลุ่ม 6 พี่ประสิทธิ์', province:'Bangkok', zoning:'Kor. 4', rai:46, ngan:1, sqwa:44.7, totalSqwa:18544.7, pricePerSqwa:26500, totalMB:491.43, status:'Remained', permits:'', hasPresentation:true, hasCanva:true, lat:13.6200, lng:100.4400 },
  { no:8, site:'Donmueang Songprapa', team:'กลุ่ม 6 พี่ประสิทธิ์', province:'Bangkok', zoning:'Yor. 3', rai:29, ngan:1, sqwa:39.1, totalSqwa:11739.1, pricePerSqwa:42000, totalMB:493.04, status:'Remained', permits:'', hasPresentation:true, hasCanva:true, lat:13.9125, lng:100.6057 },
  { no:9, site:'Phaholyothin 59', team:'กลุ่ม 6 พี่ประสิทธิ์', province:'Bangkok', zoning:'Yor.6', rai:1, ngan:0, sqwa:88, totalSqwa:488, pricePerSqwa:395000, totalMB:192.76, status:'Remained', permits:'', hasPresentation:true, hasCanva:true, lat:13.8600, lng:100.5700 },
  { no:10, site:'Yaek Kor Por Aor Station', team:'กลุ่ม 1 พี่เต้', province:'Bangkok', zoning:'Yor. 4', rai:11, ngan:2, sqwa:72, totalSqwa:4672, pricePerSqwa:230000, totalMB:1074.56, status:'Remained', permits:'Site filled and leveled', hasPresentation:true, hasCanva:true, lat:13.7600, lng:100.5200 },
  { no:11, site:'Ladkrabang 18/1', team:'กลุ่ม 1 พี่เต้', province:'Samut Prakan', zoning:'Yor. 5', rai:3, ngan:1, sqwa:6.7, totalSqwa:1306.7, pricePerSqwa:187500, totalMB:245.01, status:'Remained', permits:'EIA Approved (Condo)', hasPresentation:true, hasCanva:true, lat:13.7260, lng:100.7490 },
  { no:12, site:'Sukhumvit 76', team:'กลุ่ม 1 พี่เต้', province:'Samut Prakan', zoning:'Yor.4', rai:36, ngan:2, sqwa:90, totalSqwa:14690, pricePerSqwa:45000, totalMB:661.05, status:'Remained', permits:'Site filled and leveled', hasPresentation:true, hasCanva:true, lat:13.6600, lng:100.6100 },
  { no:13, site:'Theparak Bangbo', team:'กลุ่ม 1 พี่เต้', province:'Samut Prakan', zoning:'Yor. 5', rai:26, ngan:3, sqwa:57, totalSqwa:10757, pricePerSqwa:27500, totalMB:295.82, status:'Remained', permits:'', hasPresentation:true, hasCanva:true, lat:13.5900, lng:100.6800 },
  { no:14, site:'Lum Luk Ka Khlong 6', team:'กลุ่ม 4 พี่เป๋า', province:'Pathumthani', zoning:'', rai:36, ngan:3, sqwa:6, totalSqwa:14706, pricePerSqwa:22000, totalMB:324, status:'Remained', permits:'', hasPresentation:true, hasCanva:true, lat:13.9800, lng:100.7200 },
  { no:15, site:'Ratchaphreuk New Road', team:'กลุ่ม 4 พี่เป๋า', province:'Pathumthani', zoning:'', rai:40, ngan:0, sqwa:28.2, totalSqwa:16028, pricePerSqwa:33500, totalMB:537, status:'Remained', permits:'', hasPresentation:true, hasCanva:true, lat:13.9600, lng:100.5300 },
  { no:16, site:'Ratchaphreuk Robinson (1)', team:'กลุ่ม 4 พี่เป๋า', province:'Nonthaburi', zoning:'Yor.3', rai:12, ngan:0, sqwa:27.4, totalSqwa:4827, pricePerSqwa:53000, totalMB:256, status:'Remained', permits:'', hasPresentation:true, hasCanva:true, lat:13.8200, lng:100.3900 },
  { no:17, site:'Ratchaphreuk Robinson (2)', team:'กลุ่ม 4 พี่เป๋า', province:'Nonthaburi', zoning:'Yor.3', rai:18, ngan:3, sqwa:41.1, totalSqwa:7541, pricePerSqwa:49000, totalMB:369, status:'Remained', permits:'', hasPresentation:false, hasCanva:false, lat:13.8150, lng:100.3850 },
  { no:18, site:'Nakhon In', team:'กลุ่ม 4 พี่เป๋า', province:'Nonthaburi', zoning:'Yor.3', rai:29, ngan:2, sqwa:38.6, totalSqwa:11839, pricePerSqwa:68000, totalMB:805, status:'Remained', permits:'', hasPresentation:true, hasCanva:true, lat:13.8700, lng:100.4700 },
  { no:19, site:'Chaengwattana', team:'กลุ่ม 5 พี่ตี๋', province:'Nonthaburi', zoning:'Yor. 8', rai:1, ngan:3, sqwa:90, totalSqwa:790, pricePerSqwa:360000, totalMB:284, status:'Remained', permits:'', hasPresentation:true, hasCanva:false, lat:13.8800, lng:100.5400 },
  { no:20, site:'Chaophraya Pakkret', team:'กลุ่ม 5 พี่ตี๋', province:'Nonthaburi', zoning:'Kor. 3', rai:24, ngan:3, sqwa:36, totalSqwa:9936, pricePerSqwa:30000, totalMB:298, status:'Remained', permits:'', hasPresentation:true, hasCanva:false, lat:13.9100, lng:100.5000 },
  { no:21, site:'Bang Kruai - Sai Noi', team:'กลุ่ม 5 พี่ตี๋', province:'Nonthaburi', zoning:'Yor.2', rai:24, ngan:2, sqwa:91, totalSqwa:18691, pricePerSqwa:18000, totalMB:336, status:'Remained', permits:'', hasPresentation:true, hasCanva:true, lat:13.8100, lng:100.3300 },
  { no:22, site:'Nakhonpathom', team:'กลุ่ม 5 พี่ตี๋', province:'Nakhonpathom', zoning:'', rai:3, ngan:3, sqwa:63.9, totalSqwa:1564, pricePerSqwa:45000, totalMB:70, status:'Remained', permits:'', hasPresentation:true, hasCanva:false, lat:13.8199, lng:100.0440 },
  { no:23, site:'Laem Chabang Meyer', team:'กลุ่ม 2 พี่กราฟ', province:'Chonburi', zoning:'EEC', rai:10, ngan:0, sqwa:22.4, totalSqwa:4022.4, pricePerSqwa:70000, totalMB:281.57, status:'Remained', permits:'', hasPresentation:true, hasCanva:false, lat:13.0700, lng:100.8900 },
  { no:24, site:'Bangpakong', team:'กลุ่ม 2 พี่กราฟ', province:'Chachoengsao', zoning:'EEC', rai:12, ngan:0, sqwa:0, totalSqwa:4800, pricePerSqwa:79167, totalMB:380, status:'Remained', permits:'EIA Approved (Condo) / Foundation laid', hasPresentation:true, hasCanva:false, lat:13.6200, lng:101.0500 },
  { no:25, site:'Amata Panthong', team:'กลุ่ม 2 พี่กราฟ', province:'Chonburi', zoning:'EEC', rai:38, ngan:1, sqwa:72.9, totalSqwa:15372.9, pricePerSqwa:30000, totalMB:461.19, status:'Remained', permits:'', hasPresentation:true, hasCanva:false, lat:13.4500, lng:101.0200 },
  { no:26, site:'Pattaya Healthland', team:'กลุ่ม 2 พี่กราฟ', province:'Chonburi', zoning:'EEC', rai:3, ngan:0, sqwa:25, totalSqwa:1225, pricePerSqwa:390000, totalMB:477.75, status:'Remained', permits:'EIA Approved (Hotel)', hasPresentation:true, hasCanva:false, lat:12.9500, lng:100.8800 },
  { no:27, site:'Pattaya Homepro (2 Plot)', team:'กลุ่ม 2 พี่กราฟ', province:'Chonburi', zoning:'EEC', rai:1, ngan:3, sqwa:56.5, totalSqwa:756.5, pricePerSqwa:181500, totalMB:137.30, status:'Remained', permits:'', hasPresentation:true, hasCanva:false, lat:12.9400, lng:100.8700 },
  { no:29, site:'Sriracha J-Park', team:'กลุ่ม 9 พี่จิ๊บ', province:'Chonburi', zoning:'EEC', rai:9, ngan:2, sqwa:14.4, totalSqwa:3814.4, pricePerSqwa:80000, totalMB:305.15, status:'Remained', permits:'', hasPresentation:true, hasCanva:false, lat:13.1700, lng:100.9200 },
  { no:30, site:'Bangsaen', team:'กลุ่ม 9 พี่จิ๊บ', province:'Chonburi', zoning:'EEC', rai:2, ngan:3, sqwa:80.8, totalSqwa:1180.8, pricePerSqwa:190000, totalMB:227, status:'Remained', permits:'EIA Approved (Condo)', hasPresentation:true, hasCanva:false, lat:13.2800, lng:100.9200 },
  { no:31, site:'Sriracha Bestbuy', team:'กลุ่ม 9 พี่จิ๊บ', province:'Chonburi', zoning:'EEC', rai:1, ngan:1, sqwa:2, totalSqwa:502, pricePerSqwa:300000, totalMB:150.6, status:'Remained', permits:'', hasPresentation:true, hasCanva:false, lat:13.1600, lng:100.9300 },
  { no:32, site:'Rayong-Nern Samlee', team:'กลุ่ม 9 พี่จิ๊บ', province:'Rayong', zoning:'EEC', rai:4, ngan:3, sqwa:89.2, totalSqwa:1989.2, pricePerSqwa:55000, totalMB:109.41, status:'Remained', permits:'', hasPresentation:true, hasCanva:false, lat:12.6800, lng:101.2700 },
  { no:33, site:'Huahin Petchkasem', team:'กลุ่ม 8,10 พี่อาย หยิง', province:'Prachuap Khiri Khan', zoning:'', rai:3, ngan:2, sqwa:96, totalSqwa:1496, pricePerSqwa:310000, totalMB:463.76, status:'Remained', permits:'', hasPresentation:true, hasCanva:false, lat:12.5700, lng:99.9500 },
  { no:34, site:'Phuket Center (Housing)', team:'กลุ่ม 8,10 พี่อาย หยิง', province:'Phuket', zoning:'', rai:13, ngan:0, sqwa:38, totalSqwa:5238, pricePerSqwa:65000, totalMB:340.47, status:'Remained', permits:'', hasPresentation:true, hasCanva:true, lat:7.9500, lng:98.3300 },
  { no:35, site:'Phuket Center (Condo)', team:'กลุ่ม 8,10 พี่อาย หยิง', province:'Phuket', zoning:'', rai:5, ngan:0, sqwa:24.2, totalSqwa:2024.2, pricePerSqwa:130000, totalMB:263.15, status:'Remained', permits:'EIA Approved (Condo)', hasPresentation:false, hasCanva:false, lat:7.9480, lng:98.3280 },
  { no:36, site:'Phuket Cherngtalay (2)', team:'กลุ่ม 8,10 พี่อาย หยิง', province:'Phuket', zoning:'', rai:6, ngan:0, sqwa:87.5, totalSqwa:2487.5, pricePerSqwa:125000, totalMB:310.94, status:'Remained', permits:'', hasPresentation:true, hasCanva:true, lat:7.9900, lng:98.2800 },
  { no:37, site:'Phuket Cherngtalay (3)', team:'กลุ่ม 8,10 พี่อาย หยิง', province:'Phuket', zoning:'', rai:1, ngan:0, sqwa:24.3, totalSqwa:424.3, pricePerSqwa:125000, totalMB:53.04, status:'SOLD', permits:'', hasPresentation:true, hasCanva:true, lat:7.9920, lng:98.2820 },
  { no:38, site:'Phuket Kata (1)', team:'กลุ่ม 8,10 พี่อาย หยิง', province:'Phuket', zoning:'', rai:5, ngan:3, sqwa:91, totalSqwa:2391, pricePerSqwa:414471, totalMB:991, status:'Remained', permits:'', hasPresentation:true, hasCanva:false, lat:7.8200, lng:98.2900 },
  { no:39, site:'Phuket Kata (2)', team:'กลุ่ม 8,10 พี่อาย หยิง', province:'Phuket', zoning:'', rai:1, ngan:2, sqwa:14.9, totalSqwa:614.9, pricePerSqwa:600098, totalMB:369, status:'Remained', permits:'', hasPresentation:false, hasCanva:false, lat:7.8180, lng:98.2880 },
  { no:40, site:'Khaoyai Thanarat', team:'กลุ่ม 7 ปิง', province:'Nakhonratchasima', zoning:'', rai:33, ngan:1, sqwa:75, totalSqwa:13375, pricePerSqwa:55000, totalMB:735.63, status:'Remained', permits:'', hasPresentation:true, hasCanva:false, lat:14.4400, lng:101.3700 },
  { no:41, site:'Khonkean Nonmuang', team:'กลุ่ม 7 ปิง', province:'Khonkean', zoning:'', rai:4, ngan:0, sqwa:81.9, totalSqwa:1681.9, pricePerSqwa:55000, totalMB:92.50, status:'Remained', permits:'', hasPresentation:true, hasCanva:false, lat:16.4300, lng:102.8300 },
  { no:42, site:'Khonkean Maliwan', team:'กลุ่ม 7 ปิง', province:'Khonkean', zoning:'', rai:62, ngan:3, sqwa:36.7, totalSqwa:25136.7, pricePerSqwa:15000, totalMB:377.05, status:'Remained', permits:'', hasPresentation:true, hasCanva:false, lat:16.4500, lng:102.8500 },
]

export const HOTEL_DATA: Hotel[] = [
  { no:1, project:'Holiday Inn & Suites Sriracha', team:'กลุ่ม 3 พี่เต๋า', province:'Chonburi', price:'1,400 MB', towers:1, storeys:27, keys:347, facilities:'Lobby Lounge, Restaurant, Swimming Pool, Fitness, Onsen, Meeting Room', type:'FREEHOLD', rai:2, ngan:3, sqwa:37.7, totalSqwa:1137.7, permits:'', status:'Remained', lat:13.1500, lng:100.9300 },
  { no:2, project:'IBIS Huahin', team:'', province:'Prachuap Khiri Khan', price:'450 MB', towers:1, storeys:6, keys:200, facilities:'Lobby Lounge, Restaurant, Swimming Pool, Meeting Room', type:'FREEHOLD', rai:2, ngan:0, sqwa:60.5, totalSqwa:860.5, permits:'', status:'Remained', lat:12.5500, lng:99.9600 },
  { no:3, project:'IBIS Style Krabi Ao Nang', team:'', province:'Krabi', price:'600 MB', towers:1, storeys:5, keys:206, facilities:'Lobby Lounge, Restaurant, Swimming Pool, Meeting Room', type:'FREEHOLD', rai:4, ngan:0, sqwa:48.7, totalSqwa:1648.7, permits:'', status:'Remained', lat:8.0800, lng:98.9100 },
  { no:4, project:'Origin Complex Sanampao', team:'', province:'Bangkok', price:'2,500 MB', towers:1, storeys:25, keys:'-', facilities:'Office Building, Office 33,572 sqm, Retail 1,516 sqm', type:'LEASEHOLD', rai:3, ngan:2, sqwa:61, totalSqwa:1461, permits:'', status:'Remained', lat:13.7900, lng:100.5500 },
  { no:5, project:'Wellness Stay & Hotel Sukhumvit 107', team:'', province:'Bangkok', price:'290 MB', towers:1, storeys:8, keys:136, facilities:'Lobby Lounge, Restaurant, Meeting Room, Fitness, Wellness & Spa', type:'FREEHOLD', rai:0, ngan:3, sqwa:76.8, totalSqwa:376.8, permits:'', status:'Remained', lat:13.6900, lng:100.6400 },
  { no:6, project:'Holiday Inn Express Rayong', team:'', province:'Rayong', price:'600 MB', towers:1, storeys:8, keys:204, facilities:'Lobby Lounge, Restaurant, Bar, Meeting Room, Fitness, Swimming Pool, Kids Room', type:'FREEHOLD', rai:1, ngan:3, sqwa:83, totalSqwa:783, permits:'', status:'Remained', lat:12.6600, lng:101.2800 },
  { no:7, project:'Beehive Boutique Hotel Phuket', team:'', province:'Phuket', price:'750 MB / 600 MB AS IS', towers:2, storeys:7, keys:255, facilities:'Lobby Lounge, Restaurant, Bar, Meeting Room, Fitness, Swimming Pool', type:'FREEHOLD', rai:3, ngan:3, sqwa:36.2, totalSqwa:1536.2, permits:'', status:'Remained', lat:7.9200, lng:98.2800 },
  { no:8, project:'Green Palace Hotel Nimman', team:'', province:'Chiang Mai', price:'350 MB / 250 MB AS IS', towers:1, storeys:8, keys:102, facilities:'Lobby Lounge, Restaurant', type:'FREEHOLD', rai:0, ngan:3, sqwa:89, totalSqwa:389, permits:'', status:'Remained', lat:18.7950, lng:98.9700 },
]
