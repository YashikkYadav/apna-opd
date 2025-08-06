const multer = require("multer");
const fs = require("fs");
const path = require("path");

const smartUploader = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const field = file.fieldname; // e.g., "doctor_profile_image"
      const match = field.match(/^(.+)_image$/); // extract {var}
      if (!match) {
        return cb(new Error(`Invalid field format: "${field}". Must be in "{var}_image"`), false);
      }

      const folderName = match[1]; // Extracted var name
      const folderPath = path.join(__dirname, "..", "public", folderName);

      // Create folder if it doesn't exist
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      cb(null, folderPath);
    },

    filename: (req, file, cb) => {
      const timestamp = Date.now();
      const ext = path.extname(file.originalname);
      cb(null, `${file.fieldname}_${req.params.healthServeId}_${timestamp}${ext}`);
    }
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed."), false);
    }
  };

  const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  }).any(); // Accept any fields

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError || err) {
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  };
};

module.exports = smartUploader;
