const multer = require('multer');
const path = require('path');
const careerLeadService = require('../services/careerLead.service');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/resumes/');
  },
  filename: (req, file, cb) => {
    const name = req.body.name.replace(/\s+/g, '_'); 
    const timestamp = Date.now();
    const extension = path.extname(file.originalname); 
    cb(null, `resume_${name}_${timestamp}${extension}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only PDF is allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 10
  }
}).single('resume');


const createCareerLead = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    try {
      if (!req.file) {
        return res.status(400).send({ message: 'Resume file is required.' });
      }

      const careerLeadData = req.body;
      
      careerLeadData.resumePath = req.file.path;

      const careerLead = await careerLeadService.createCareerLead(careerLeadData);

      if (careerLead?.error) {
        return res
          .status(careerLead.statusCode)
          .send(careerLead.error);
      }

      res
        .status(careerLead.statusCode)
        .json({
          message: 'Application submitted successfully!',
          careerLead: careerLead.careerLead,
        });

    } catch (error) {
      res
        .status(500)
        .send(`Error: ${error.message}`);
    }
  });
};

const getCareerLeads = async (req, res) => {
  try {

    const careerLeads = await careerLeadService.getCareerLeads();
    if (careerLeads?.error) {
      return res
        .status(careerLeads.statusCode)
        .send(careerLeads.error);
    }

    res
      .status(careerLeads.statusCode)
      .json({
        careerLeads: careerLeads.careerLeads,
      });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

module.exports = {
  getCareerLeads,
  createCareerLead,
};
