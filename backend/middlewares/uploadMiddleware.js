const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const smartUploader = () => {
  const storage = multer.memoryStorage(); // store files in memory
  const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith("image/")) cb(null, true);
      else cb(new Error("Only image files are allowed."), false);
    },
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  }).any(); // accept any fields

  return async (req, res, next) => {

    upload(req, res, async (err) => {
      if (err) return res.status(400).json({ error: err.message });
      
      try {
        if (!req.files) return next();

        for (const file of req.files) {
          console.log("Processing file:", file);
          const field = file.fieldname;
          const match = field.match(/^(.+)_image$/);
          if (!match) throw new Error(`Invalid field format: "${field}".`);

          const folderName = match[1];
          const folderPath = path.join(__dirname, "..", "public", folderName);
          if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });

          const timestamp = Date.now();
          const ext = path.extname(file.originalname);
          const filename = `${file.fieldname}_${req.params.healthServeId}_${timestamp}${ext}`;
          const filepath = path.join(folderPath, filename);

          // Compress image using sharp with resizing
          const MAX_DIM = 1600; // max width/height
          let quality = 80;
          let buffer = file.buffer;
          let compressedBuffer = await sharp(buffer)
            .resize({ width: MAX_DIM, height: MAX_DIM, fit: "inside" })
            .jpeg({ quality })
            .toBuffer();

          // Iteratively reduce quality until <= 150KB
          while (compressedBuffer.length / 1024 > 150 && quality > 20) {
            quality -= 10;
            compressedBuffer = await sharp(buffer)
              .resize({ width: MAX_DIM, height: MAX_DIM, fit: "inside" })
              .jpeg({ quality })
              .toBuffer();
          }

          console.log("Compressed size in bytes:", compressedBuffer.length);
          console.log("Compressed size in KB:", (compressedBuffer.length / 1024).toFixed(2));

          fs.writeFileSync(filepath, compressedBuffer);
          // replace original file buffer with path info
          file.savedPath = `${folderName}/${filename}`;
        }

        next();
      } catch (error) {
        console.error("Image processing error:", error);
        return res.status(500).json({ error: error.message });
      }
    });
  };
};

module.exports = smartUploader;
