'use client';
import { motion } from 'framer-motion';
import { FaTint } from 'react-icons/fa';

const STATUS = {

    limited: "bg-yellow-50 border-yellow-400 text-yellow-600",

};

const BloodCard = ({ name }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-2xl border-b-4 p-4 min-h-[100px] text-center w-[60px] sm:w-[140px] md:w-[120px] font-semibold shadow-sm transition-all duration-300 bg-yellow-50 border-yellow-400 text-yellow-600"
        >
            <div className="text-lg text-black">{name}</div>
        </motion.div>
    );
};
const ComponentsCard = ({ label, status, highlight }) => {
    const color = STATUS[status];
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className={`rounded-2xl border-b-4 p-4 min-h-[100px] text-center w-[60px] sm:w-[140px] md:w-[16vw] font-semibold shadow-sm transition-all duration-300 ${color}`}
        >
            <div className="text-lg text-black">{label}</div>
            <div className="text-sm mt-1">{highlight}</div>
        </motion.div>
    );
};

const Availability = ({ healthProfile }) => {


    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring" }}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-12 max-w-7xl mx-auto mt-12 mb-8"
        >
            {/* Title */}
            <div className=" mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0C65A0] flex items-center gap-3">
                    <FaTint className="text-3xl text-red-600" />
                    Blood Types & Components Availability
                </h2>
            </div>

            {/* Blood Types */}
            <div className="mb-6">
                <div className="flex flex-wrap justify-center md:justify-around gap-2">
                    {healthProfile?.bloodTypes?.map((item) => (
                        <BloodCard key={item._id} name={item.type} />
                    ))}
                </div>
            </div>
            {/* Components */}
            {/* <div>
                <div className="flex flex-wrap justify-center md:justify-around gap-2">
                    {components.map((item) => (
                        <ComponentsCard key={item.label} {...item} />
                    ))}
                </div>
            </div> */}

            {/* Last Updated */}
            <div className="text-center pt-6 text-sm text-gray-500">
                📅 Last updated on <span className="font-medium">{`{{last_updated_time}}`}</span>
            </div>
        </motion.div>
    );
};

export default Availability;
