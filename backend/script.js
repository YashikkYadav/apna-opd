const DoctorProfile = require("./models/doctorProfile");
const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://irfangouri9983:qgowCHWoBIuLaUjb@cluster0.rxjk0n9.mongodb.net";

async function addLocationObjectIds() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    const doctorProfiles = await DoctorProfile.find({});
    console.log(`Found ${doctorProfiles.length} doctor profiles.`);

    let updatedCount = 0;

    for (const profile of doctorProfiles) {
      let isUpdated = false;
      const updatedLocations = profile.locations.map((location) => {
        if (!location._id) {
          location._id = new mongoose.Types.ObjectId();
          isUpdated = true;
        }
        return location;
      });

      if (isUpdated) {
        profile.locations = updatedLocations;
        await profile.save();
        updatedCount++;
      }
    }

    console.log(
      `Successfully added _id to locations in ${updatedCount} doctor profiles.`
    );
  } catch (error) {
    console.error("Error:", error);
  } finally {
    mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

addLocationObjectIds();
