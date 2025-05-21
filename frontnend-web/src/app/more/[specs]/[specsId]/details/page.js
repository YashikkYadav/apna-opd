"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AboutCommon from "../../../../components/more/common/AboutCommon";
import BannerCommon from "../../../../components/more/common/BannerCommon";
import ImageGalleryCommon from "../../../../components/more/common/ImageGalleryCommon";
import SuggestedService from "../../../../components/more/common/SuggestedService";
import Loader from "../../../../components/common-components/Loader";
import axiosInstance from "@/app/config/axios";
const DetailsPage = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const  specs = params.specs;
  const  specsId = params.specsId;

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/health-serve/list?&location=&type=${specs}`
      );

      if (response?.list?.healthServeProfileList) {
        response.list.healthServeProfileList?.forEach((item) => {
          if (item._id === specsId) {
            setProfileData(item);
            console.log("item", item);
          }
        });
      }
      if (!response?.list?.healthServeProfileList) {
        setError(`No data found for ${params.specs} with ID ${params.specsId}`);
        return;
      }

    } catch (error) {
      console.log("Error fetching service details:", error);
      setError("Failed to load details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.specs && params.specsId) {
      fetchData();
    }
  }, []);

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
        profileData={profileData} 
        serviceType={specs} 
      />
      <AboutCommon 
        profileData={profileData} 
        serviceType={specs} 
      />
      {/* <ImageGalleryCommon 
        images={.images || []}
      /> */}
      <SuggestedService 
        serviceType={specs}
        currentId={specsId}
      />
    </div>
  );
};

export default DetailsPage;
