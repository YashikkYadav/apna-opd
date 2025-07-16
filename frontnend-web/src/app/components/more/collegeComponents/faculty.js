'use client';
import { motion } from 'framer-motion';
import { FaUserMd } from 'react-icons/fa';

const Faculty = ({
    principal = {
        name: '{{principal_name}}',
        qualification: '{{principal_qualification}}',
        experience: '{{principal_experience}}',
        initials: 'PR',
    },
    hod = {
        name: '{{hod_name}}',
        qualification: '{{hod_qualification}}',
        experience: '{{hod_experience}}',
        initials: 'HD',
    },
    senior = {
        name: '{{senior_faculty_name}}',
        qualification: '{{senior_faculty_qualification}}',
        experience: '{{senior_faculty_experience}}',
        initials: 'SF',
    },
}) => {
    const faculty = [
        {
            ...principal,
            title: 'Principal & Professor',
            desc: `${principal.experience} years of experience in medical education`,
        },
        {
            ...hod,
            title: 'Head of Department',
            desc: `${hod.experience} years of clinical and teaching experience`,
        },
        {
            ...senior,
            title: 'Senior Faculty',
            desc: `${senior.experience} years of specialized experience`,
        },
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
        >
            {/* Section Title */}
            <div className=" mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 flex items-center gap-3">
                    <FaUserMd className="text-3xl text-blue-700" />

                    Meet Our Faculty
                </h2>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {faculty.map((f, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.04, boxShadow: '0 0 0 4px rgba(59,130,246,0.3)' }}
                        className="bg-[#F7F9FB] rounded-2xl p-6 text-center hover:border-2 hover:border-blue-500 transition-all"
                    >
                        {/* Avatar */}
                        <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow">
                            {f.initials}
                        </div>

                        {/* Name & Details */}
                        <h3 className="text-blue-700 text-lg font-bold mb-1">{f.name}</h3>
                        <p className="text-gray-700 font-medium">{f.title}</p>
                        <p className="text-sm text-gray-600 mt-2">{f.qualification}</p>
                        <p className="text-sm text-gray-600">{f.desc}</p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default Faculty;
