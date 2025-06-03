import axios from "axios";
import { searchCities } from "../services/locationService";

export const specialties = [
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Pediatrician",
  "Orthopedic Surgeon",
  "Gynecologist",
  "Ophthalmologist",
  "Psychiatrist",
  "Endocrinologist",
  "Oncologist",
  "Urologist",
  "Gastroenterologist",
  "Pulmonologist",
  "Rheumatologist",
  "Allergist",
  "Nurse",
];

// Update getLocations to be async and use the locationService
export const getLocations = async (searchText) => {
  try {
    const locations = await searchCities(searchText);
    return locations || [];
  } catch (error) {
    console.log("Error fetching locations:", error);
    return [];
  }
};

export const getSpecialties = () => {
  return specialties;
};

export const serviceTypes = {
  AMBULANCE: "ambulance",
  HOSPITAL: "hospital",
  EMERGENCY: "emergency",
  VATENARY: "veterinary",
  GYM: "gym",
  YOGA: "yoga",
  MEDITATION: "commercial-meditation",
  NASHA_MUKTI: "nasha-mukti-kendra",
  MEDICAL_STORE: "medical-store",
  NURSING_COLLEGE: "nursing-college",
  BLOOD_BANK: "blood-bank",
  PHYSIOTHERAPIST: "physiotherapist",
  BLOOD_DONOR: "blood-donor",
  NURSE: "nurse",
};

// Sample data structure for different services
export const servicesData = {
  ambulance: [
    {
      id: 1,
      title: "City Emergency Ambulance",
      rating: 4.8,
      price: 1500,
      description:
        "City Emergency Ambulance provides 24/7 emergency medical transportation services with fully equipped ambulances and trained paramedics. We ensure quick response times and professional care during transit.",
      images: [
        "/images/ambulance1.jpg",
        "/images/ambulance2.jpg",
        "/images/ambulance3.jpg",
      ],
      contactDetails: {
        phone: "+91 98765 43210",
        address: "123 Healthcare Street, Mumbai",
        organization: "City Emergency Services",
      },
      experience: "15 Years",
      establishment: "2008",
      certifications:
        "ISO 9001:2015 Certified, National Accreditation Board for Hospitals & Healthcare Providers",
      facilities: [
        "Advanced Life Support",
        "Basic Life Support",
        "Patient Transport",
        "Neonatal Transport",
        "Cardiac Care",
      ],
      schedule: {
        "24/7": "Available",
      },
    },
    {
      id: 2,
      title: "Life Support Ambulance Services",
      rating: 4.9,
      price: 30,
      images: ["/images/ambulance2.jpg"],
      contactDetails: {
        phone: "+91 98765 43211",
        address: "456 Medical Avenue, Delhi",
      },
    },
    {
      id: 3,
      title: "Quick Response Ambulance",
      rating: 4.7,
      price: 28,
      images: ["/images/ambulance3.jpg"],
      contactDetails: {
        phone: "+91 98765 43212",
        address: "789 Emergency Road, Bangalore",
      },
    },
  ],

  gym: [
    {
      id: 1,
      title: "FitZone Premium Gym",
      rating: 4.9,
      price: 50,
      specialty: ["Weight Training", "Cardio", "CrossFit"],
      images: ["/images/gym1.jpg"],
      contactDetails: {
        phone: "+91 98765 43213",
        address: "45 Fitness Avenue, Delhi",
      },
      facilities: ["24/7 Access", "Personal Training", "Steam Room"],
    },
    {
      id: 2,
      title: "PowerHouse Fitness",
      rating: 4.8,
      price: 45,
      specialty: ["Strength Training", "HIIT", "Yoga"],
      images: ["/images/gym2.jpg"],
      contactDetails: {
        phone: "+91 98765 43214",
        address: "22 Wellness Street, Mumbai",
      },
      facilities: ["Group Classes", "Spa", "Nutrition Counseling"],
    },
    {
      id: 3,
      title: "Elite Fitness Club",
      rating: 4.7,
      price: 55,
      specialty: ["Boxing", "Functional Training", "Pilates"],
      images: ["/images/gym3.jpg"],
      contactDetails: {
        phone: "+91 98765 43215",
        address: "88 Health Park, Bangalore",
      },
      facilities: ["Swimming Pool", "Sauna", "Cafe"],
    },
  ],

  yoga: [
    {
      id: 1,
      title: "Peaceful Yoga Center",
      rating: 4.7,
      price: 30,
      specialty: ["Hatha Yoga", "Meditation", "Pranayama"],
      images: ["/images/yoga1.jpg"],
      contactDetails: {
        phone: "+91 98765 43214",
        address: "78 Serenity Lane, Bangalore",
      },
      instructors: ["John Doe", "Jane Smith"],
    },
    {
      id: 2,
      title: "Mindful Yoga Studio",
      rating: 4.8,
      price: 35,
      specialty: ["Vinyasa Flow", "Ashtanga", "Yin Yoga"],
      images: ["/images/yoga2.jpg"],
      contactDetails: {
        phone: "+91 98765 43215",
        address: "34 Zen Street, Mumbai",
      },
      instructors: ["Sarah Johnson", "Mike Chen"],
    },
    {
      id: 3,
      title: "Traditional Yoga Academy",
      rating: 4.9,
      price: 40,
      specialty: ["Kundalini Yoga", "Power Yoga", "Yoga Therapy"],
      images: ["/images/yoga3.jpg"],
      contactDetails: {
        phone: "+91 98765 43216",
        address: "56 Peace Road, Delhi",
      },
      instructors: ["Guru Amit", "Maya Patel"],
    },
  ],

  meditation: [
    {
      id: 1,
      title: "Mindfulness Meditation Center",
      rating: 4.8,
      price: 35,
      specialty: ["Vipassana", "Zen Meditation", "Guided Meditation"],
      images: ["/images/meditation1.jpg"],
      contactDetails: {
        phone: "+91 98765 43215",
        address: "90 Peace Street, Chennai",
      },
      instructors: ["Sarah Wilson", "Mike Brown"],
    },
    {
      id: 2,
      title: "Inner Peace Sanctuary",
      rating: 4.9,
      price: 40,
      specialty: ["Transcendental Meditation", "Sound Healing", "Mindfulness"],
      images: ["/images/meditation2.jpg"],
      contactDetails: {
        phone: "+91 98765 43216",
        address: "45 Tranquil Avenue, Mumbai",
      },
      instructors: ["David Lee", "Priya Shah"],
    },
    {
      id: 3,
      title: "Zen Meditation Studio",
      rating: 4.7,
      price: 30,
      specialty: ["Buddhist Meditation", "Breathing Techniques", "Yoga Nidra"],
      images: ["/images/meditation3.jpg"],
      contactDetails: {
        phone: "+91 98765 43217",
        address: "23 Calm Road, Pune",
      },
      instructors: ["Master Wong", "Lisa Taylor"],
    },
  ],

  nasha_mukti: [
    {
      id: 1,
      title: "New Life Rehabilitation Center",
      rating: 4.6,
      price: 100,
      treatments: ["Detoxification", "Counseling", "Group Therapy"],
      images: ["/images/rehab1.jpg"],
      contactDetails: {
        phone: "+91 98765 43216",
        address: "567 Recovery Road, Pune",
      },
      facilities: [
        "24/7 Medical Care",
        "Family Counseling",
        "Aftercare Support",
      ],
    },
    {
      id: 2,
      title: "Hope Recovery Center",
      rating: 4.7,
      price: 120,
      treatments: ["Medical Detox", "Behavioral Therapy", "Holistic Healing"],
      images: ["/images/rehab2.jpg"],
      contactDetails: {
        phone: "+91 98765 43217",
        address: "89 Healing Street, Delhi",
      },
      facilities: [
        "Residential Treatment",
        "Psychiatric Support",
        "Recreation Activities",
      ],
    },
    {
      id: 3,
      title: "Serenity Rehabilitation",
      rating: 4.8,
      price: 110,
      treatments: [
        "Addiction Treatment",
        "Mental Health Care",
        "Family Programs",
      ],
      images: ["/images/rehab3.jpg"],
      contactDetails: {
        phone: "+91 98765 43218",
        address: "34 Wellness Road, Mumbai",
      },
      facilities: [
        "Luxury Accommodation",
        "Yoga & Meditation",
        "Nutritional Support",
      ],
    },
  ],
  medical_store: [
    {
      id: 1,
      title: "HealthMart Pharmacy",
      rating: 4.8,
      price: 25,
      images: ["/images/medical1.jpg"],
      contactDetails: {
        phone: "+91 98765 43217",
        address: "123 Pharmacy Street, Mumbai",
      },
    },
    {
      id: 2,
      title: "MediCare Pharmacy",
      rating: 4.7,
      price: 20,
      images: ["/images/medical2.jpg"],
      contactDetails: {
        phone: "+91 98765 43218",
        address: "456 Pharmacy Avenue, Delhi",
      },
    },
  ],
  nursing_college: [
    {
      id: 1,
      title: "HealthMart Pharmacy",
      rating: 4.8,
      price: 25,
      images: ["/images/medical1.jpg"],
      contactDetails: {
        phone: "+91 98765 43219",
        address: "789 Pharmacy Road, Bangalore",
      },
    },
    {
      id: 2,
      title: "MediCare Pharmacy",
      rating: 4.7,
      price: 20,
      images: ["/images/medical2.jpg"],
      contactDetails: {
        phone: "+91 98765 43220",
        address: "101 Pharmacy Lane, Mumbai",
      },
    },
  ],
  blood_bank: [
    {
      id: 1,
      title: "HealthMart Pharmacy",
      rating: 4.8,
      price: 25,
      images: ["/images/medical1.jpg"],
      contactDetails: {
        phone: "+91 98765 43221",
        address: "123 Blood Bank Street, Delhi",
      },
    },
    {
      id: 2,
      title: "MediCare Pharmacy",
      rating: 4.7,
      price: 20,
      images: ["/images/medical2.jpg"],
      contactDetails: {
        phone: "+91 98765 43222",
        address: "456 Blood Bank Avenue, Mumbai",
      },
    },
  ],
  physiotherapist: [
    {
      id: 1,
      title: "HealthMart Pharmacy",
      rating: 4.8,
      price: 25,
      images: ["/images/medical1.jpg"],
      contactDetails: {
        phone: "+91 98765 43223",
        address: "789 Physiotherapy Street, Bangalore",
      },
    },
    {
      id: 2,
      title: "MediCare Pharmacy",
      rating: 4.7,
      price: 20,
      images: ["/images/medical2.jpg"],
      contactDetails: {
        phone: "+91 98765 43224",
        address: "101 Physiotherapy Avenue, Mumbai",
      },
    },
  ],
  blood_donor: [
    {
      id: 1,
      title: "HealthMart Pharmacy",
      rating: 4.8,
      price: 25,
      images: ["/images/medical1.jpg"],
      contactDetails: {
        phone: "+91 98765 43225",
        address: "123 Blood Donor Street, Delhi",
      },
    },
    {
      id: 2,
      title: "MediCare Pharmacy",
      rating: 4.7,
      price: 20,
      images: ["/images/medical2.jpg"],
      contactDetails: {
        phone: "+91 98765 43226",
        address: "456 Blood Donor Avenue, Mumbai",
      },
    },
  ],
};

// Getter functions for services
export const getServiceData = async (serviceType, id = null) => {
  try {
    if (!id) {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/health-serve/list?type=${serviceType}`
      );
      return response?.list?.healthServeProfileList || [];
    }
    
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${id}/health-serve-profile`
    );
    return response?.healthServeProfile || null;
  } catch (error) {
    console.error('Error fetching service data:', error);
    return [];
  }
};
