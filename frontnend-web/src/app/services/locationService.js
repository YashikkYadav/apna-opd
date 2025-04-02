import axiosInstance from "../config/axios";

const RAPID_API_KEY = "a212f876a4msh333e4cc9325a2b4p1d2776jsn91eac5c9e8e9";
const RAPID_API_HOST = "wft-geo-db.p.rapidapi.com";

// Add cache to store recent searches
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const searchCities = async (searchText) => {
  try {
    // Check cache first
    const cacheKey = searchText?.toLowerCase();
    const cachedData = cache.get(cacheKey);
    if (cachedData && cachedData.timestamp > Date.now() - CACHE_DURATION) {
      return cachedData.data;
    }

    const response = await fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${searchText}&countryIds=IN&limit=10`,
      {
        headers: {
          "x-rapidapi-host": RAPID_API_HOST,
          "x-rapidapi-key": RAPID_API_KEY,
        },
      }
    );

    if (response.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }

    const data = await response.json();
    const formattedData = data?.data?.map((city) => ({
      value: `${city.id}-${city.name}`, // Make value unique
      label: `${city.name}, ${city.regionCode}`,
    }));

    // Cache the results
    cache.set(cacheKey, {
      data: formattedData,
      timestamp: Date.now(),
    });

    return formattedData;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};
