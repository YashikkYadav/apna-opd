"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getServiceData } from "../../../../data/constants";
import AboutCommon from "../../../../components/more/common/AboutCommon";
import BannerCommon from "../../../../components/more/common/BannerCommon";
import ImageGalleryCommon from "../../../../components/more/common/ImageGalleryCommon";
import SuggestedService from "../../../../components/more/common/SuggestedService";
import Loader from "../../../../components/common-components/Loader";

const DetailsPage = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [serviceData, setServiceData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);
        // Convert specs parameter to the format used in constants.js
        const serviceType = params.specs.replace(/-/g, '_');
        const data = getServiceData(serviceType, params.specsId);
        
        if (!data) {
          setError(`No data found for ${params.specs} with ID ${params.specsId}`);
          return;
        }
        
        setServiceData(data);
      } catch (error) {
        console.error("Error fetching service details:", error);
        setError("Failed to load details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (params.specs && params.specsId) {
      fetchData();
    }
  }, [params.specs, params.specsId]);

  if (loading) return <Loader />;
  
  if (error) {
    return (
      <div className="pt-[120px] text-center">
        <h2 className="text-2xl text-red-500">{error}</h2>
      </div>
    );
  }

  return (
    <div className="pt-[80px]">
      <BannerCommon 
        serviceData={serviceData} 
        serviceType={params.specs} 
      />
      <AboutCommon 
        serviceData={serviceData} 
        serviceType={params.specs} 
      />
      <ImageGalleryCommon 
        images={serviceData.images || []} 
      />
      <SuggestedService 
        serviceType={params.specs}
        currentId={params.specsId}
      />
    </div>
  );
};

export default DetailsPage;
