import NurseListings from "../components/more/nurse/NurseListings";
import NurseSearch from "../components/more/nurse/NurseSearch";
import PatientTestimonials from "../components/more/nurse/PatientTestimonials";
import WhyChooseUs from "../components/more/nurse/WhyChooseUs";

// Consolidated data into a single object
export const nurseDetails = {
  nurses: [
    {
      id: 1,
      initials: "PS",
      name: "Dr. Priya Sharma",
      verified: true,
      location: "South Delhi",
      experience: "8+ years in ICU",
      languages: "Hindi, English",
      specializations: ["ICU Care", "Post-operative", "COVID Care"],
      rating: 4.8,
      reviews: 127,
      fee: "1,800-2,200",
      gender: "Female",
      image: "/images/d2.png"
    },
    {
      id: 2,
      initials: "RK",
      name: "Rajesh Kumar",
      verified: true,
      location: "Noida",
      experience: "12+ years in Elderly Care",
      languages: "Hindi, English, Punjabi",
      specializations: ["Elderly Care", "Physiotherapy", "Diabetes Care"],
      rating: 4.9,
      reviews: 89,
      fee: "1,500-1,800",
      gender: "Male",
      image: "/images/d1.png"
    },
    {
      id: 3,
      initials: "SP",
      name: "Sunita Patel",
      verified: true,
      location: "Gurgaon",
      experience: "6+ years in Pediatrics",
      languages: "Hindi, English, Gujarati",
      specializations: ["Pediatric", "Neonatal", "Vaccination"],
      rating: 4.7,
      reviews: 156,
      fee: "1,600-2,000",
      gender: "Female",
      image: "/images/d4.png"
    },
    {
      id: 4,
      initials: "AS",
      name: "Amit Singh",
      verified: true,
      location: "Central Delhi",
      experience: "10+ years in Emergency Care",
      languages: "Hindi, English",
      specializations: ["Emergency Care", "Trauma", "Critical Care"],
      rating: 4.6,
      reviews: 98,
      fee: "2,000-2,500",
      gender: "Male",
      image: "/images/d3.png"
    },
    {
      id: 5,
      initials: "KJ",
      name: "Kavita Joshi",
      verified: true,
      location: "East Delhi",
      experience: "5+ years in Home Care",
      languages: "Hindi, English",
      specializations: ["Home Care", "Palliative Care"],
      rating: 4.5,
      reviews: 70,
      fee: "1,400-1,700",
      gender: "Female",
      image: "/images/w1.png"
    },
    {
      id: 6,
      initials: "SN",
      name: "Suresh Nambiar",
      verified: true,
      location: "West Delhi",
      experience: "7+ years in Post-operative Care",
      languages: "Tamil, English",
      specializations: ["Post-operative", "Wound Care"],
      rating: 4.7,
      reviews: 90,
      fee: "1,700-2,000",
      gender: "Male",
      image: "/images/p3.png"
    },
  ],
  searchData: {
    locations: ["Delhi", "Mumbai", "Bangalore"],
    nurseTypes: ["Registered Nurse (RN)", "Licensed Practical Nurse (LPN)", "Certified Nursing Assistant (CNA)"],
    availabilities: ["Full-time", "Part-time", "Hourly"],
    genders: ["Male", "Female", "Any"]
  },
  testimonials: [
    {
      id: 1,
      text: "The nurse assigned to care for my elderly mother was exceptional. Professional, caring, and extremely knowledgeable. Highly recommend Apna OPD!",
      author: "Rajesh Kumar",
      location: "Delhi",
      image: "/images/man.png",
    },
    {
      id: 2,
      text: "Post-surgery care was seamless. The nurse was punctual, professional, and provided excellent care. Recovery was smooth thanks to their expertise.",
      author: "Priya Sharma",
      location: "Mumbai",
      image: "/images/p2.png",
    },
    {
      id: 3,
      text: "Amazing service! The pediatric nurse was wonderful with my child. Very patient and skilled. Will definitely use Apna OPD again.",
      author: "Sandeep Patel",
      location: "Bangalore",
      image: "/images/p1.png",
    },
    {
      id: 4,
      text: "The nurse's attention to detail and compassionate approach made a huge difference during my recovery at home. Truly grateful for their support.",
      author: "Anjali Singh",
      location: "Chennai",
      image: "/images/w1.png",
    },
    {
      id: 5,
      text: "Excellent home nursing service. The staff was very responsive and provided personalized care that met all our needs. Highly satisfied!",
      author: "Vikram Reddy",
      location: "Hyderabad",
      image: "/images/p3.png",
    },
  ],
  features: [
    { title: "100% Verified", show: true },
    { title: "24x7 Support", show: true },
    { title: "Transparent Pricing", show: true },
    { title: "500+ Nurses", show: true },
    { title: "4.7+ Rating", show: true },
    { title: "All Specialties", show: true }
  ]
};

const NurseProfile = () => {
    return (
        <div className="pt-[80px]">
            <NurseSearch searchData={nurseDetails.searchData}/>
            <NurseListings nurses={nurseDetails.nurses}/>
            <WhyChooseUs showFeatures={nurseDetails.features}/>
            <PatientTestimonials testimonials={nurseDetails.testimonials}/>
        </div>
    )
};

export default NurseProfile;
