const axios = require("axios");

// =====================================
// Get Nearby Hospitals
// =====================================

const getNearbyHospitals = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: "Latitude and Longitude are required",
      });
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const url =
      `https://places.googleapis.com/v1/places:searchNearby`;

    const response = await axios.post(
      url,
      {
        includedTypes: ["hospital"],
        maxResultCount: 10,
        locationRestriction: {
          circle: {
            center: {
              latitude: parseFloat(lat),
              longitude: parseFloat(lng),
            },
            radius: 5000,
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask":
            "places.displayName,places.formattedAddress,places.location,places.rating,places.googleMapsUri,places.nationalPhoneNumber",
        },
      }
    );

    const hospitals = response.data.places || [];
        return res.status(200).json({
      success: true,
      total: hospitals.length,
      hospitals,
    });

  } catch (error) {
    console.log(error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch nearby hospitals.",
    });
  }
};

// =====================================
// Export Controller
// =====================================

module.exports = {
  getNearbyHospitals,
};
