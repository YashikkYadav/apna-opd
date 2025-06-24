// Main page data
export const doctor = {
  name: 'Dr. Priya Sharma',
  experience: '8 Years Experience',
  location: 'Malviya Nagar, Jaipur',
  homeVisit: '5km radius for home visits',
  rating: 4.8,
  reviews: 127,
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-T3ZfSx2hyuNb-IcIVQCcjZnSR_hPI2V6dg&s',
  conditions: [
    { icon: '❄️', label: 'Frozen Shoulder' },
    { icon: '🧠', label: 'Stroke Rehab' },
    { icon: '🦵', label: 'ACL Post-Surgery' },
    { icon: '🦴', label: 'Cervical Pain' },
    { icon: '⚡', label: 'Sciatica' },
    { icon: '🏃', label: 'Sports Injuries' },
    { icon: '🔄', label: 'Ortho Rehab' },
    { icon: '🧠', label: 'Neuro Physio' },
  ],
};

export const mainPackages = [
  {
    title: '10-Session Stroke Rehab at Home',
    discount: '20% OFF',
    details: [
      { label: 'Per Session', value: '60 mins' },
      { label: 'Mode', value: 'Home Visit' },
      { label: 'Total', value: '10 Sessions' },
    ],
    price: '₹12,000',
    oldPrice: '₹15,000',
    benefits: [
      'Comprehensive stroke rehabilitation',
      'Equipment provided for home sessions',
      'Progress tracking & reports',
      '24/7 support via WhatsApp',
    ],
  },
  {
    title: '5-Session Sports Recovery',
    discount: '15% OFF',
    details: [
      { label: 'Per Session', value: '45 mins' },
      { label: 'Mode', value: 'Clinic' },
      { label: 'Total', value: '5 Sessions' },
    ],
    price: '₹4,250',
    oldPrice: '₹5,000',
    benefits: [
      'Advanced sports rehabilitation',
      'Performance enhancement focus',
      'Injury prevention strategies',
      'Return-to-sport assessment',
    ],
  },
  {
    title: '8-Session Post-Op Rehab',
    discount: '25% OFF',
    details: [
      { label: 'Per Session', value: '45 mins' },
      { label: 'Mode', value: 'Home/Clinic' },
      { label: 'Total', value: '8 Sessions' },
    ],
    price: '₹6,000',
    oldPrice: '₹8,000',
    benefits: [
      'Post-surgical rehabilitation',
      'Pain management techniques',
      'Mobility restoration',
      'Flexible home/clinic options',
    ],
  },
];

export const testimonials = [
  {
    rating: 5,
    info: 'Stroke Recovery • Age 65',
    text: `Dr. Priya's home visits were a blessing during my stroke recovery. Her gentle approach and professional expertise helped me regain mobility much faster than expected. Highly recommended!`,
  },
  {
    rating: 5,
    info: 'ACL Surgery • Age 28',
    text: `Amazing physiotherapist! Dr. Priya helped me return to sports after my ACL surgery. Her sports-specific rehabilitation program was exactly what I needed. Professional and caring.`,
  },
  {
    rating: 4,
    info: 'Frozen Shoulder • Age 45',
    text: `Excellent treatment for my frozen shoulder. The clinic is well-equipped and Dr. Priya explains everything clearly. Saw significant improvement after just 4 sessions.`,
  },
];

export const mainFaqs = [
  {
    q: 'How do I know the therapist is certified?',
    a: 'Dr. Priya Sharma holds BPT and MPT degrees and is registered with the Indian Association of Physiotherapists. All certifications are verified and displayed in the clinic.',
  },
  {
    q: 'Is equipment brought for home visits?',
    a: 'Yes, all necessary equipment and tools are brought for home visits. This includes exercise bands, therapeutic equipment, and assessment tools.',
  },
  {
    q: 'How are charges calculated?',
    a: 'Charges are based on session duration, location (home visits have additional charges), and treatment type. Package deals offer significant savings compared to individual sessions.',
  },
  {
    q: 'Can I book for elderly family members remotely?',
    a: `Yes, you can book sessions for elderly family members. We'll coordinate directly with the patient and family to ensure proper care and communication.`,
  },
];

// Pharmacy page data
export const medicines = [
  {
    id: 1,
    name: 'Dolo 650mg',
    salt: 'Paracetamol',
    manufacturer: 'Micro Labs',
    mrp: 32,
    price: 28,
    packSize: '15 tablets',
    category: 'Tablet',
    inStock: true,
    discount: 12,
  },
  {
    id: 2,
    name: 'Crocin Advance',
    salt: 'Paracetamol',
    manufacturer: 'GSK',
    mrp: 45,
    price: 38,
    packSize: '20 tablets',
    category: 'Tablet',
    inStock: true,
    discount: 15,
  },
  {
    id: 3,
    name: 'Chyawanprash',
    salt: 'Herbal Blend',
    manufacturer: 'Dabur',
    mrp: 350,
    price: 315,
    packSize: '500g',
    category: 'Ayurvedic',
    inStock: true,
    discount: 10,
  },
  {
    id: 4,
    name: 'Cetirizine 10mg',
    salt: 'Cetirizine HCl',
    manufacturer: 'Cipla',
    mrp: 28,
    price: 25,
    packSize: '10 tablets',
    category: 'Tablet',
    inStock: false,
    discount: 11,
  },
  {
    id: 5,
    name: 'Cough Syrup',
    salt: 'Dextromethorphan',
    manufacturer: 'Sun Pharma',
    mrp: 85,
    price: 75,
    packSize: '100ml',
    category: 'Syrup',
    inStock: true,
    discount: 12,
  },
  {
    id: 6,
    name: 'Vitamin D3',
    salt: 'Cholecalciferol',
    manufacturer: 'Abbott',
    mrp: 120,
    price: 108,
    packSize: '30 tablets',
    category: 'OTC',
    inStock: true,
    discount: 10,
  },
];

export const pharmacyReviews = [
  { name: 'Rajesh Kumar', rating: 5, review: 'Fast delivery and genuine medicines. Highly recommended!', date: '2 days ago' },
  { name: 'Priya Sharma', rating: 4, review: 'Good discounts available. Staff is very helpful.', date: '1 week ago' },
  { name: 'Amit Singh', rating: 5, review: 'Best pharmacy in the area. Always available when needed.', date: '2 weeks ago' },
];

export const pharmacyFaqs = [
  { q: 'Is prescription required for all medicines?', a: `No, over-the-counter (OTC) medicines don't require prescription. However, prescription medicines need a valid prescription from a registered doctor.` },
  { q: 'How long does delivery take?', a: 'We offer same-day delivery within Jaipur city limits. Orders placed before 6 PM are delivered the same day, while orders after 6 PM are delivered the next day.' },
  { q: 'Do you offer discounts?', a: 'Yes, we offer competitive discounts on most medicines. Additional discounts are available for bulk orders and regular customers.' },
  { q: 'What if the medicine is unavailable?', a: 'If a medicine is unavailable, we\'ll immediately contact you to suggest alternatives or inform you when it will be back in stock.' },
];

// Healthlab page data
export const certifications = [
  'NABL Certified',
  'ISO 15189',
  'CAP Accredited',
  'ICMR Approved',
];

export const highlights = [
  { icon: 'home', title: 'Home Collection', desc: 'Available across 25km radius' },
  { icon: 'clock', title: 'Fast Reports', desc: 'Same day to 24 hours' },
  { icon: 'flask', title: 'Advanced Equipment', desc: 'Latest diagnostic technology' },
  { icon: 'file', title: 'Digital Reports', desc: 'WhatsApp & Email delivery' },
];

export const testsData = [
  { id: 1, name: 'Complete Blood Count (CBC)', icon: '🧸', sampleType: 'Blood', reportTime: 'Same Day', originalPrice: 800, discountedPrice: 399, homeCollection: true, category: 'blood', popular: true },
  { id: 2, name: 'Liver Function Test (LFT)', icon: '🫀', sampleType: 'Blood', reportTime: '24 Hours', originalPrice: 1200, discountedPrice: 699, homeCollection: true, category: 'blood' },
  { id: 3, name: 'Thyroid Function Test (TSH, T3, T4)', icon: '🦋', sampleType: 'Blood', reportTime: 'Same Day', originalPrice: 1500, discountedPrice: 899, homeCollection: true, category: 'hormonal' },
  { id: 4, name: 'HbA1c (Diabetes Check)', icon: '🍯', sampleType: 'Blood', reportTime: 'Same Day', originalPrice: 900, discountedPrice: 549, homeCollection: true, category: 'blood' },
  { id: 5, name: 'Lipid Profile', icon: '💓', sampleType: 'Blood', reportTime: '24 Hours', originalPrice: 1100, discountedPrice: 649, homeCollection: true, category: 'blood' },
  { id: 6, name: 'Urine Routine & Microscopy', icon: '🧪', sampleType: 'Urine', reportTime: 'Same Day', originalPrice: 400, discountedPrice: 199, homeCollection: true, category: 'urine' },
  { id: 7, name: 'Chest X-Ray', icon: '🫁', sampleType: 'Imaging', reportTime: '2 Hours', originalPrice: 800, discountedPrice: 599, homeCollection: false, category: 'imaging' },
  { id: 8, name: 'Vitamin D Test', icon: '☀️', sampleType: 'Blood', reportTime: '24 Hours', originalPrice: 1800, discountedPrice: 999, homeCollection: true, category: 'hormonal' },
];

export const packagesData = [
  { id: 1, name: 'Full Body Checkup Basic', testsCount: 58, tests: ['CBC', 'LFT', 'KFT', 'Lipid Profile', 'TSH', 'Blood Sugar', 'Urine R/M', 'ECG'], recommendedFor: 'Adults above 25', originalPrice: 4500, discountedPrice: 1999, reportTime: '24 Hours', homeCollection: true, popular: true },
  { id: 2, name: 'Diabetes Care Package', testsCount: 12, tests: ['HbA1c', 'Fasting Glucose', 'Post Meal Glucose', 'Insulin', 'Microalbumin', 'Creatinine'], recommendedFor: 'Diabetic Patients', originalPrice: 2800, discountedPrice: 1499, reportTime: 'Same Day', homeCollection: true },
  { id: 3, name: 'Heart Health Package', testsCount: 25, tests: ['Lipid Profile', 'CRP', 'Homocysteine', 'Troponin I', 'ECG', 'Echo', 'TMT'], recommendedFor: 'Adults above 40', originalPrice: 5500, discountedPrice: 2999, reportTime: '24 Hours', homeCollection: true },
  { id: 4, name: "Women's Health Package", testsCount: 35, tests: ['CBC', 'Thyroid Profile', 'Iron Studies', 'Vitamin D', 'Pap Smear', 'Mammography'], recommendedFor: 'Women 25-50 years', originalPrice: 6000, discountedPrice: 3499, reportTime: '48 Hours', homeCollection: true },
];

export const reviewsData = [
  { id: 1, name: 'Priya Sharma', test: 'Full Body Checkup', rating: 5, comment: 'Excellent service! Home collection was punctual and reports were delivered on time. Very professional staff.', date: '2 days ago' },
  { id: 2, name: 'Rajesh Kumar', test: 'Diabetes Package', rating: 5, comment: 'Great experience. The phlebotomist was skilled and the digital reports were very detailed. Highly recommended!', date: '1 week ago' },
  { id: 3, name: 'Anita Gupta', test: 'Thyroid Test', rating: 4, comment: 'Good service overall. Report came within the promised time. Will use again for future tests.', date: '2 weeks ago' },
];

export const faqData = [
  { question: 'Can I reschedule my sample pickup?', answer: 'Yes, you can reschedule your sample pickup up to 2 hours before the scheduled time by calling our customer service or through WhatsApp.' },
  { question: 'When will I get my report?', answer: 'Report delivery times vary by test type. Most routine tests are delivered same day or within 24 hours. Specialized tests may take 24-48 hours. You\'ll receive reports via WhatsApp and email.' },
  { question: 'How do I pay for the tests?', answer: 'We accept multiple payment methods including cash on delivery, UPI, credit/debit cards, and online banking. Payment can be made during sample collection or online while booking.' },
  { question: 'Are reports shared via WhatsApp/email?', answer: 'Yes, we provide digital reports through both WhatsApp and email. You\'ll receive a secure link to download your reports. Physical copies are available on request.' },
  { question: 'Is home collection available in my area?', answer: 'We provide home collection services within a 25km radius of our lab. Enter your pincode during booking to check availability in your area.' },
  { question: 'What should I do before the test?', answer: 'Fasting requirements and preparation instructions vary by test. We\'ll send you detailed preparation guidelines via SMS and WhatsApp after booking confirmation.' },
]; 