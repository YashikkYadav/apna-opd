'use client';
import { motion } from 'framer-motion';
import { CloudUpload, Camera, FileText } from 'lucide-react';

const UploadPrescription = ({ acceptsPrescriptions = true }) => {
    if (!acceptsPrescriptions) return null;

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="bg-white rounded-2xl shadow-lg p-6 md:p-10 mb-10 max-w-4xl mx-auto"
        >
            {/* Title */}
            <h2 className="text-3xl font-extrabold text-blue-700 mb-6">Upload Prescription</h2>

            {/* Upload Box */}
            <div className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-2xl p-10 text-center">
                <div className="mb-6">
                    <CloudUpload className="mx-auto h-12 w-12 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    Upload your prescription
                </h3>
                <p className="text-blue-700 mb-6">
                    We accept prescriptions in PDF, JPG, or PNG format. Maximum file size: 5MB.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center transition">
                        <FileText className="w-5 h-5 mr-2" />
                        Choose File
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center transition">
                        <Camera className="w-5 h-5 mr-2" />
                        Take Photo
                    </button>
                </div>

                {/* Info Note */}
                <div className="mt-6 text-sm text-blue-600 leading-relaxed">
                    <p>• Supported formats: PDF, JPG, PNG</p>
                    <p>• Maximum file size: 5MB</p>
                    <p>• We'll process your prescription within 24 hours</p>
                </div>
            </div>
        </motion.section>
    );
};

export default UploadPrescription;
