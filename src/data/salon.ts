export type Lang = "ar" | "en";
export type L = { ar: string; en: string };

export const salon = {
  name: { ar: "صالون لمسة", en: "Lamsa Salon" },
  tagline: { ar: "لمسة تفرق", en: "A touch that makes the difference" },
  heroSub: {
    ar: "شعر، مكياج، أظافر وعناية بالبشرة بإيدين خبيرات — في جو هادي وفخم.",
    en: "Hair, makeup, nails and skincare by expert hands, in a calm, luxurious space.",
  },
  phone: "+20 100 000 0000",
  address: { ar: "١٢ شارع النخيل، الزمالك، القاهرة", en: "12 El Nakheel St, Zamalek, Cairo" },
};

export type Category = { id: string; label: L };
export const categories: Category[] = [
  { id: "hair", label: { ar: "شعر", en: "Hair" } },
  { id: "makeup", label: { ar: "مكياج", en: "Makeup" } },
  { id: "nails", label: { ar: "أظافر", en: "Nails" } },
  { id: "skin", label: { ar: "عناية بالبشرة", en: "Skincare" } },
];

export type Service = { id: string; cat: string; icon: string; name: L; desc: L; minutes: number; price: number };
export const services: Service[] = [
  { id: "cut", cat: "hair", icon: "✂️", name: { ar: "قص وتسريحة", en: "Cut & Style" }, desc: { ar: "قصة تناسب شكل وشك مع سشوار ناعم.", en: "A cut shaped to your face, finished with a smooth blow-dry." }, minutes: 60, price: 350 },
  { id: "color", cat: "hair", icon: "🎨", name: { ar: "صبغة كاملة", en: "Full Colour" }, desc: { ar: "ألوان لامعة بتدوم، بمنتجات خالية من الأمونيا.", en: "Glossy, long-lasting colour with ammonia-free products." }, minutes: 120, price: 900 },
  { id: "protein", cat: "hair", icon: "💆‍♀️", name: { ar: "بروتين وكيراتين", en: "Keratin Treatment" }, desc: { ar: "شعر ناعم ومفرود ولامع لحد ٣ شهور.", en: "Sleek, frizz-free shine for up to three months." }, minutes: 150, price: 1500 },
  { id: "soiree", cat: "makeup", icon: "💄", name: { ar: "مكياج سواريه", en: "Evening Makeup" }, desc: { ar: "لوك جذاب للسهرات والمناسبات.", en: "A head-turning look for parties and big nights." }, minutes: 75, price: 800 },
  { id: "daily", cat: "makeup", icon: "🌸", name: { ar: "مكياج يومي", en: "Everyday Glow" }, desc: { ar: "لوك طبيعي وخفيف يبرز جمالك.", en: "Light, natural makeup that lets your skin shine." }, minutes: 40, price: 400 },
  { id: "lashes", cat: "makeup", icon: "👁️", name: { ar: "تركيب رموش", en: "Lash Extensions" }, desc: { ar: "رموش كثيفة بشكل طبيعي.", en: "Fuller lashes that still look like yours." }, minutes: 60, price: 600 },
  { id: "mani", cat: "nails", icon: "💅", name: { ar: "مانيكير جل", en: "Gel Manicure" }, desc: { ar: "ألوان جل بتعيش أسبوعين من غير ما تتقشر.", en: "Chip-free gel colour that lasts two weeks." }, minutes: 45, price: 300 },
  { id: "pedi", cat: "nails", icon: "🦶", name: { ar: "باديكير سبا", en: "Spa Pedicure" }, desc: { ar: "تنظيف وتقشير ومساج مريح للرجلين.", en: "Soak, scrub and a relaxing foot massage." }, minutes: 60, price: 350 },
  { id: "art", cat: "nails", icon: "✨", name: { ar: "نيل آرت", en: "Nail Art" }, desc: { ar: "رسومات وتصميمات على ذوقك.", en: "Custom designs, from minimal to bold." }, minutes: 30, price: 200 },
  { id: "facial", cat: "skin", icon: "🧖‍♀️", name: { ar: "تنظيف بشرة عميق", en: "Deep Cleansing Facial" }, desc: { ar: "تنظيف وتقشير وماسك حسب نوع بشرتك.", en: "Cleanse, exfoliate and a mask matched to your skin." }, minutes: 60, price: 550 },
  { id: "hydra", cat: "skin", icon: "💧", name: { ar: "هيدرافيشال", en: "HydraFacial" }, desc: { ar: "ترطيب عميق ونضارة من أول جلسة.", en: "Deep hydration and a glow from the very first session." }, minutes: 50, price: 1200 },
  { id: "glow", cat: "skin", icon: "🌙", name: { ar: "ماسك الذهب", en: "Gold Glow Mask" }, desc: { ar: "ماسك فاخر بالذهب لإشراقة فورية.", en: "A luxurious gold mask for instant radiance." }, minutes: 40, price: 700 },
];

export type Stylist = { id: string; initials: L; name: L; specialty: L; rating: number; gradient: string };
export const stylists: Stylist[] = [
  { id: "nour", initials: { ar: "ن", en: "N" }, name: { ar: "نور حسن", en: "Nour Hassan" }, specialty: { ar: "خبيرة شعر وصبغات", en: "Hair & colour expert" }, rating: 4.9, gradient: "from-primary to-secondary" },
  { id: "mariam", initials: { ar: "م", en: "M" }, name: { ar: "مريم سامي", en: "Mariam Samy" }, specialty: { ar: "ميكب آرتيست عرايس", en: "Bridal makeup artist" }, rating: 4.8, gradient: "from-secondary to-gold" },
  { id: "salma", initials: { ar: "س", en: "S" }, name: { ar: "سلمى عادل", en: "Salma Adel" }, specialty: { ar: "أظافر وعناية بالبشرة", en: "Nails & skincare" }, rating: 4.7, gradient: "from-gold to-primary" },
];

export const anyStylist: L = { ar: "أي متخصصة", en: "Any stylist" };

export const offer = {
  badge: { ar: "عرض خاص", en: "Special offer" },
  title: { ar: "باقة العروسة", en: "The Bridal Package" },
  desc: { ar: "مكياج + تسريحة + مانيكير وباديكير + تنظيف بشرة قبل الفرح.", en: "Makeup, hair styling, mani-pedi and a pre-wedding facial, all in one." },
  old: 4500,
  price: 3500,
  cta: { ar: "احجزي الباقة", en: "Book the package" },
};

export const hours: { day: L; time: L }[] = [
  { day: { ar: "السبت – الخميس", en: "Saturday – Thursday" }, time: { ar: "١١ ص – ١٠ م", en: "11 am – 10 pm" } },
  { day: { ar: "الجمعة", en: "Friday" }, time: { ar: "٢ م – ١٠ م", en: "2 pm – 10 pm" } },
];

export const timeSlots = ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];

export const t = {
  nav: { services: { ar: "الخدمات", en: "Services" }, team: { ar: "الفريق", en: "Team" }, booking: { ar: "الحجز", en: "Booking" }, visit: { ar: "زورينا", en: "Visit" } },
  bookCta: { ar: "احجزي موعدك", en: "Book your visit" },
  servicesTitle: { ar: "خدماتنا", en: "Our services" },
  servicesSub: { ar: "اختاري اللي يناسبك من قايمتنا", en: "Pick what suits you from our menu" },
  min: { ar: "دقيقة", en: "min" },
  teamTitle: { ar: "فريق لمسة", en: "Meet the team" },
  teamSub: { ar: "خبيرات بيحبوا شغلهم", en: "Experts who love what they do" },
  bookingTitle: { ar: "اطلبي موعد", en: "Request an appointment" },
  steps: [
    { ar: "الخدمات", en: "Services" },
    { ar: "المتخصصة", en: "Stylist" },
    { ar: "الميعاد", en: "Date & time" },
    { ar: "بياناتك", en: "Your details" },
  ],
  stepHint: [
    { ar: "اختاري خدمة أو أكتر", en: "Choose one or more services" },
    { ar: "مين تحبي تخدمك؟", en: "Who would you like to see?" },
    { ar: "اختاري اليوم والساعة", en: "Pick a day and a time" },
    { ar: "خلّينا نعرفك", en: "Tell us about you" },
  ],
  next: { ar: "التالي", en: "Next" },
  back: { ar: "رجوع", en: "Back" },
  submit: { ar: "ابعتي الطلب", en: "Send request" },
  name: { ar: "الاسم", en: "Name" },
  phone: { ar: "رقم الموبايل", en: "Mobile number" },
  notes: { ar: "ملاحظات (اختياري)", en: "Notes (optional)" },
  notesPh: { ar: "أي حاجة تحبي نعرفها…", en: "Anything we should know…" },
  summary: { ar: "ملخص الطلب", en: "Summary" },
  total: { ar: "الإجمالي", en: "Total" },
  errService: { ar: "اختاري خدمة واحدة على الأقل", en: "Please choose at least one service" },
  errSlot: { ar: "اختاري يوم وساعة", en: "Please choose a day and a time" },
  errName: { ar: "اكتبي اسمك", en: "Please enter your name" },
  errPhone: { ar: "اكتبي رقم موبايل صحيح (١١ رقم)", en: "Please enter a valid 11-digit mobile number" },
  successTitle: { ar: "وصلنا طلبك، هنكلمك نأكد الموعد", en: "We've got your request — we'll call you to confirm" },
  successSub: { ar: "شكرًا لاختيارك لمسة 💗", en: "Thank you for choosing Lamsa 💗" },
  newBooking: { ar: "طلب جديد", en: "New request" },
  demoNote: { ar: "موقع تجريبي — لا يتم حجز مواعيد حقيقية", en: "Demo website — no real appointments are booked" },
  today: { ar: "النهارده", en: "Today" },
  hoursTitle: { ar: "مواعيد العمل", en: "Opening hours" },
  locationTitle: { ar: "مكاننا", en: "Find us" },
  mapPh: { ar: "الخريطة هنا", en: "Map goes here" },
  rights: { ar: "© ٢٠٢٦ صالون لمسة. كل الحقوق محفوظة.", en: "© 2026 Lamsa Salon. All rights reserved." },
  unavailable: { ar: "محجوز", en: "Booked" },
};
