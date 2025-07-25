'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaUniversity } from 'react-icons/fa';

const RelatedColleges = ({
    data,
    colleges = [
        {
            name: '{{related_college_1}}',
            location: '{{related_city_1}}',
            specialization: '{{related_specialization_1}}',
            year: '{{related_year_1}}',
            link: '#',
        },
        {
            name: '{{related_college_2}}',
            location: '{{related_city_2}}',
            specialization: '{{related_specialization_2}}',
            year: '{{related_year_2}}',
            link: '#',
        },
        {
            name: '{{related_college_3}}',
            location: '{{related_city_3}}',
            specialization: '{{related_specialization_3}}',
            year: '{{related_year_3}}',
            link: '#',
        },
    ]
}) => {
    const router = useRouter();

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-10 max-w-7xl mx-auto mt-12 mb-8"
        >
            {/* Header */}
            <div className=" mb-6">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 flex items-center gap-3">
                <FaUniversity className="text-blue-700 text-3xl" />
                
                    Related Colleges Near {data?.location}
                </h2>
            </div>

            <p className="text-lg text-gray-600 mb-10">
                Explore other medical institutions in your area
            </p>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {colleges.map((college, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.04, boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.2)' }}
                        className="bg-blue-600 text-white rounded-2xl p-6 flex flex-col justify-between shadow-md transition-all"
                    >
                        <div className="flex flex-col gap-2">
                            <h3 className="text-xl font-bold mb-1">{college.name}</h3>
                            <p><span className="font-semibold">📍 Location:</span> {college.location}</p>
                            <p><span className="font-semibold">📘 Specialization:</span> {college.specialization}</p>
                            <p><span className="font-semibold">🏫 Established:</span> {college.year}</p>
                        </div>
                        <button
                            onClick={() => router.push(college.link)}
                            className="mt-6 bg-white text-blue-700 font-bold py-2 px-6 rounded-full hover:bg-blue-50 transition"
                        >
                            View Details
                        </button>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default RelatedColleges;
