'use client';
import { motion } from 'framer-motion';

const courses = [
    {
        title: 'B.Sc Nursing',
        details: [
            { label: 'Duration', value: '4 Years' },
            { label: 'Eligibility', value: '12th Science (PCB)' },
            { label: 'Seats', value: '{{bsc_seats}} Seats' },
        ],
    },
    {
        title: 'GNM (General Nursing & Midwifery)',
        details: [
            { label: 'Duration', value: '3.5 Years' },
            { label: 'Eligibility', value: '12th Any Stream' },
            { label: 'Seats', value: '{{gnm_seats}} Seats' },
        ],
    },
    {
        title: 'ANM (Auxiliary Nurse Midwifery)',
        details: [
            { label: 'Duration', value: '2 Years' },
            { label: 'Eligibility', value: '10th Pass' },
            { label: 'Seats', value: '{{anm_seats}} Seats' },
        ],
    },
    {
        title: 'MBBS',
        details: [
            { label: 'Duration', value: '5.5 Years' },
            { label: 'Eligibility', value: 'NEET Qualified' },
            { label: 'Seats', value: '{{mbbs_seats}} Seats' },
        ],
    },
    {
        title: 'Paramedical Courses',
        details: [
            { label: 'Duration', value: '1-3 Years' },
            { label: 'Eligibility', value: '10th/12th Pass' },
            { label: 'Specializations', value: 'Multiple Options' },
        ],
    },
    {
        title: 'Diploma & Certificate',
        details: [
            { label: 'Duration', value: '6 Months - 2 Years' },
            { label: 'Eligibility', value: 'Varies by Course' },
            { label: 'Mode', value: 'Full-time/Part-time' },
        ],
    },
];

const CoursesOffered = ({ healthProfile }) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
        >
            <div className="text-left mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700">Courses Offered</h2>
                <p className="text-gray-600 text-lg mt-2">
                    Explore our comprehensive range of medical and nursing programs
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {healthProfile?.courses.map((course, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.03 }}
                        className="bg-white border-l-4 border-blue-500 hover:border-blue-700 rounded-2xl p-6 shadow-md transition-all"
                    >
                        <h3 className="text-lg font-bold text-gray-800 mb-4">{course.name}</h3>
                        <ul className="space-y-1 text-gray-700">
                            <li><span className="font-semibold">Duration:</span> {course.duration}</li>
                            <li><span className="font-semibold">Seats:</span> {course.seats}</li>
                            <li><span className="font-semibold">Eligibility:</span> {course.eligibility}</li>
                        </ul>
                    </motion.div>
                ))}

            </div>
        </motion.section>
    );
};

export default CoursesOffered;
