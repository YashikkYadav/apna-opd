const mongoose = require('mongoose');

const googleKeysSchema = new mongoose.Schema(
    {

        message: { type: String },
        access_token: { type: String },
        expiry_date: { type: Number },
        token_type: { type: String },
        scope: { type: String },
    },
    {
        timestamps: true,
    },
);

const googlekeys = mongoose.model('googlekeys', googleKeysSchema);
module.exports = googlekeys;
