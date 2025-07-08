const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
    {
        healthServeId: {
            index: true,
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "HealthServe",
        },
        doctorInfo: {
            name: String,
            specialty: String,
            location: String,
            phone: String,
            email: String,
            description: String,
            features: [
                { label: String, enabled: Boolean }
            ],
            conditions: [
                { label: String, icon: String }
            ]
        },
        highlights: [
            { icon: String, title: String, desc: String }
        ],
        services: [
            { id: Number, name: String }
        ],
        packages: [
            {
                id: Number,
                name: String,
                sessions: Number,
                price: Number,
                discount: Number,
                description: String
            }
        ],
        reviews: [
            {
                id: Number,
                name: String,
                service: String,
                rating: Number,
                comment: String,
                date: String
            }
        ],
        faqs: [
            { question: String, answer: String }
        ],
    }
    ,
    {
        timestamps: true,
    },
);

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
