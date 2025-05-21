const { verifyAccessToken } = require("../utils/helpers");
const Admin = require("../models/admin");

const adminMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;
    const { adminId } = req.params;

    const admin = await Admin.findById({ _id: adminId });

    if (!admin) {
      return res.status(403).json({ error: "Admin not found" });
    }

    const adminDetails = await verifyAccessToken(accessToken);
    if (adminDetails?.error) {
      return res.status(402).json({ error: adminDetails.error });
    }

    if (adminDetails.data._id != adminId) {
      return res.status(400).json({ error: "Unauthorized access" });
    }

    next();
  } catch (err) {
    res.status(499).json({ error: err });
  }
};

module.exports = adminMiddleware;