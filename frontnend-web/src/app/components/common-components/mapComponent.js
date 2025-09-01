import { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
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

                const location = response.data.results[0]?.geometry?.location;
                if (location) setCoords(location);
            } catch (err) {
                console.error("Error fetching coordinates:", err);
            }
        };

        fetchCoords();
    }, [address]);

    if (loadError) return <p>Error loading map</p>;
    if (!isLoaded) return <p>Loading map...</p>;
    if (!coords) return <p>Fetching location...</p>;

    return (
        <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            zoom={16}
            center={coords}
        >
            <Marker position={coords} />
        </GoogleMap>
    );
};

export default MapComponent;
