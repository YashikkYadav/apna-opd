import { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

import { Navigation } from "lucide-react";

import axios from "axios";

const MapComponent = ({ address }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const [coords, setCoords] = useState(null);

  useEffect(() => {
    if (!address) return;

    const fetchCoords = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json`,
          {
            params: {
              address,
              key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
            },
          }
        );

        const result = response.data.results[0];
        const location = result?.geometry?.location;
        if (location) {
          setCoords(location);
        }
      } catch (err) {
        console.error("Error fetching coordinates:", err);
      }
    };

    fetchCoords();
  }, [address]);

//   const handleGetDirections = () => {
//     if (coords) {
//       const url = `https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lng}&travelmode=driving`;
//       window.open(url, "_blank");
//     }
//   };

  if (loadError) return <p>Error loading map</p>;
  if (!isLoaded) return <p>Loading map...</p>;
  if (!coords) return <p>Fetching location...</p>;

  return (
    <div className="relative w-full h-64 rounded-lg overflow-hidden">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        zoom={16}
        center={coords}
      >
        <Marker position={coords} />
      </GoogleMap>
      <a target="_blank" href={`https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lng}&travelmode=driving`} className="absolute top-1/4 right-2.5 bg-white/90 rounded-sm p-2 transition-opacity duration-300">
        <Navigation className="w-6 h-6 text-gray-600" />
      </a>
    </div>
  );
};

export default MapComponent;
