'use client';
import { motion } from 'framer-motion';

const VetProfileSection = ({
    healthProfile,profileData,data

}) => {
    const {
        qualifications,
        experience_years,
        specialization,
        languages,
        fee,
    
    } = profileData || {}
    const info = [
        { label: 'EXPERIENCE', value: `${healthProfile?.experience}+ Years` },
        { label: 'SPECIALIZATION', value: healthProfile?.specialization },
        { label: 'LANGUAGES', value: healthProfile?.languages?.map(lang=>(lang))?.join(", ") },
        { label: 'CONSULTATION FEE', value: healthProfile?.consultationFee },
    ];
    console.log("healthProfile:", healthProfile);

    return (
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, type: "spring" }}
        className="bg-white rounded-3xl shadow-lg p-6 md:p-10 max-w-7xl mx-auto mt-12 mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-10 max-w-6xl mx-auto">
          {/* Doctor Image */}
          <div className="flex-shrink-0">
            <img
              src={
                healthProfile &&
                healthProfile?.galleryImages &&
                healthProfile?.galleryImages[0]
                  ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${healthProfile?.galleryImages[0]}`
                  : "/images/max.png"
              }
              alt={`Dr. ${healthProfile?.name}`}
              className="rounded-full border-4 border-blue-200 shadow-xl w-72 h-72 object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex-1 space-y-3">
            <div>
              <h2 className="text-3xl font-extrabold text-blue-700">
                Dr. {data?.name ?? "dummy"}
              </h2>
              <p className="text-gray-700 text-base font-medium leading-relaxed">
                {healthProfile?.about}
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {info.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 0 2px rgba(37, 99, 235, 0.3)",
                  }}
                  className="bg-[#F7F9FB] p-5 rounded-xl border-l-4 border-blue-500 hover:border-blue-600 transition-all"
                >
                  <p className="text-sm font-semibold text-gray-500">
                    {item.label}
                  </p>
                  <p className="text-lg font-bold text-blue-700 mt-1">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    );
};

export default VetProfileSection;
