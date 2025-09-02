'use client';
import { motion } from 'framer-motion';
import { FaUniversity } from 'react-icons/fa';
import Image from 'next/image';

const CollegeOverview = ({
    college_name = 'VisionTech Medical College',
    type = 'Medical',
    established_year = '1998',
    city = 'Pune',
    state = 'Maharashtra',
    affiliated_to = 'Pune University',
    approving_bodies = 'AICTE, MCI',
    recognition_bodies = 'UGC, NAAC',
    full_address = '123 Vision Road, Pune, Maharashtra',
    phone_number = '+91 9876543210',
    email = 'info@visiontech.edu.in',
    description = 'Get to know VisionTech – your gateway to excellence in medical education.',
    imageUrl = '/images/college-campus.jpg',
    healthProfile,
    data,

}) => {
    const items = [
        {
            label: 'College Information',
            value: (
                <>
                    <p><strong>Name:</strong> {data?.name}</p>
                    <p><strong>Type:</strong> {data?.type}</p>
                    <p><strong>Established:</strong> {healthProfile?.established}</p>
                    <p><strong>Location:</strong> {data?.location}</p>
                </>
            )
        },
        {
            label: 'Accreditation & Approval',
            value: (
                <>
                    <p><strong>Affiliated To:</strong> {healthProfile?.affiliatedTo}</p>
                    <p><strong>Approved By:</strong> {healthProfile?.approvedBy}</p>
                    <p><strong>Recognition:</strong> {healthProfile?.recognition}</p>
                </>
            )
        },
        {
            label: 'Contact Details',
            value: (
                <>
                    <p><strong>Address:</strong> {data?.location}</p>
                    <p><strong>Phone:</strong> {data?.phone}</p>
                    <p><strong>Email:</strong> {data?.email}</p>
                </>
            )
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
        >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
                <div className="flex-1">
                    <div className=" mb-4">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 flex items-center gap-3">
                        <FaUniversity className="text-3xl text-blue-700" />
                        
                            College Overview
                        </h2>
                    </div>
                    <p className="text-gray-700 text-lg font-medium max-w-2xl">{healthProfile?.about}</p>
                </div>

                <div className="flex-shrink-0 w-full md:w-[300px]">
                    <Image
                        src={imageUrl}
                        alt="College Campus"
                        width={300}
                        height={200}
                        className="rounded-2xl object-cover shadow-lg border border-blue-200 w-full"
                    />
                </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.03, boxShadow: '0 0 0 2px rgba(37, 99, 235, 0.3)' }}
                        className="bg-[#F7F9FB] rounded-2xl p-6 min-h-[180px] border-l-4 border-blue-500 hover:border-blue-700 transition-all"
                    >
                        <h3 className="text-lg font-bold text-blue-600 mb-2">{item.label}</h3>
                        <div className="text-gray-800 text-base font-medium space-y-1">{item.value}</div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default CollegeOverview;
