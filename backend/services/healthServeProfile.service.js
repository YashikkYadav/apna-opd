const HealthServeProfile = require("../models/healthServeProfile");
const getDoctorProfile = async (healthServeId) => {
  try {
    const doctorProfile = await HealthServeProfile.findOne({
      healthServeId,
    }).populate("healthServeId");

    return {
      statusCode: 200,
      doctorProfile,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
};

const deleteImage = async (doctorId, image) => {
  try {
    deleteImageFile(image.filename);
    const imageUrl = image.url;
    const updatedProfile = await DoctorProfile.findOneAndUpdate(
      { doctorId },
      { $pull: { images: { url: imageUrl } } },
      { new: true }
    );
    return {
      statusCode: 200,
      images: updatedProfile.images,
    };
  } catch (error) {
    console.log("Error while deleting image from Db : ", error);
    return {
      statusCode: 500,
      error: error.message,
    };
  }
};

function deleteImageFile(filename) {
  const filePath = path.join(
    __dirname,
    "..",
    "public",
    "doctor-profile",
    filename
  );

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err.message);
    } else {
      console.log("File deleted successfully:", filename);
    }
  });
}

module.exports = {
  deleteImage,
  getDoctorProfile,
};
