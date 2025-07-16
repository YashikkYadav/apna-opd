'use client';
import { motion } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';

const AdmissionProcess = ({
    application_start = '{{application_start}}',
    application_deadline = '{{application_deadline}}',
    entrance_exam_date = '{{entrance_exam_date}}',
    classes_start = '{{classes_start}}',
}) => {
    const steps = [
        {
            step: 1,
            title: 'Fill Application',
            desc: 'Complete the online application form with required details',
        },
        {
            step: 2,
            title: 'Submit Documents',
            desc: 'Upload all necessary academic and identity documents',
        },
        {
            step: 3,
            title: 'Entrance Exam',
            desc: 'Appear for entrance examination (if applicable)',
        },
        {
            step: 4,
            title: 'Interview',
            desc: 'Attend personal interview with faculty members',
        },
        {
            step: 5,
            title: 'Final Selection',
            desc: 'Receive admission confirmation and complete enrollment',
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
            <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 flex items-center gap-3 ">
                    <FaGraduationCap className="text-3xl text-blue-700" />

                    Admission Process
                </h2>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-12">
                {steps.map((step, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.04, boxShadow: '0 0 0 4px rgba(59,130,246,0.3)' }}
                        className="bg-[#F7F9FB] rounded-2xl p-6 text-center hover:border-2 hover:border-blue-500 transition-all"
                    >
                        <div className="text-white bg-blue-600 rounded-full w-10 h-10 mx-auto flex items-center justify-center font-bold mb-3">
                            {step.step}
                        </div>
                        <h4 className="text-blue-700 font-semibold text-lg mb-1">{step.title}</h4>
                        <p className="text-sm text-gray-600">{step.desc}</p>
                    </motion.div>
                ))}
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Eligibility */}
                <motion.div
                    whileHover={{ scale: 1.04, boxShadow: '0 0 0 4px rgba(59,130,246,0.3)' }}
                    className="bg-[#F7F9FB] p-6 rounded-2xl hover:border-2 hover:border-blue-500 transition-all"
                >
                    <h3 className="text-blue-700 font-bold text-lg mb-2">Eligibility Criteria</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                        <li><strong>B.Sc Nursing:</strong> 12th Science (PCB) with 50% marks</li>
                        <li><strong>GNM:</strong> 12th Any Stream with 45% marks</li>
                        <li><strong>ANM:</strong> 10th Pass with 45% marks</li>
                        <li><strong>MBBS:</strong> NEET Qualified with valid score</li>
                    </ul>
                </motion.div>

                {/* Scholarships */}
                <motion.div
                    whileHover={{ scale: 1.04, boxShadow: '0 0 0 4px rgba(59,130,246,0.3)' }}
                    className="bg-[#F7F9FB] p-6 rounded-2xl hover:border-2 hover:border-blue-500 transition-all"
                >
                    <h3 className="text-blue-700 font-bold text-lg mb-2">Scholarship Options</h3>
                    <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                        <li>Merit-based scholarships available</li>
                        <li>Government scholarship programs</li>
                        <li>Financial assistance for deserving students</li>
                        <li>Educational loan guidance</li>
                    </ul>
                </motion.div>

                {/* Important Dates */}
                <motion.div
                    whileHover={{ scale: 1.04, boxShadow: '0 0 0 4px rgba(59,130,246,0.3)' }}
                    className="bg-[#F7F9FB] p-6 rounded-2xl hover:border-2 hover:border-blue-500 transition-all"
                >
                    <h3 className="text-blue-700 font-bold text-lg mb-2">Important Dates</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                        <li><strong>Application Start:</strong> {application_start}</li>
                        <li><strong>Application Deadline:</strong> {application_deadline}</li>
                        <li><strong>Entrance Exam:</strong> {entrance_exam_date}</li>
                        <li><strong>Classes Begin:</strong> {classes_start}</li>
                    </ul>
                </motion.div>
            </div>

            {/* CTA */}
            <div className="text-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition hover:scale-105">
                    🎓 Apply Now
                </button>
            </div>
        </motion.section>
    );
};

export default AdmissionProcess;
