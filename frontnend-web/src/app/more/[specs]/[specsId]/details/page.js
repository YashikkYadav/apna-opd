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
  const specs = params.specs;
  const specsId = params.specsId;

  const fetchData = async () => {
    try {
      setLoading(true);

      const listResponse = await axiosInstance.get(
        `/health-serve/list?&location=&type=${specs}`
      );

      if (!listResponse?.list?.healthServeProfileList) {
        setError(`No data found for ${specs}`);
        return;
      }

      const basicProfile = listResponse.list.healthServeProfileList.find(
        (item) => item._id === specsId
      );

      if (!basicProfile) {
        setError(`No data found for ${specs} with ID ${specsId}`);
        return;
      }

      const detailResponse = await axiosInstance.get(
        `/${specsId}/health-serve-profile`
      );

      if (detailResponse?.healthServeProfile) {
        setProfileData({
          ...basicProfile,
          ...detailResponse.healthServeProfile,
        });
      } else {
        setProfileData(basicProfile);
      }
    } catch (error) {
      console.log("Error fetching service details:", error);
      setError(
        error?.response?.data?.error?.message ||
          "Failed to load details. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (specs && specsId) {
      fetchData();
    }
  }, [specs, specsId]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="pt-[120px] text-center">
        <h2 className="text-2xl text-red-500">{error}</h2>
      </div>
    );
  }

  if (specs === "hospital") {
    return <FullDetailsPage profileData={profileData} />;
  }

  return (
    <div className="pt-[80px]">
      <BannerCommon profileData={profileData} serviceType={specs} />
      <AboutCommon profileData={profileData} serviceType={specs} />
      {profileData?.images?.length > 0 && (
        <ImageGalleryCommon images={profileData.images} />
      )}
      <SuggestedService serviceType={specs} currentId={specsId} />
    </div>
  );
};

export default DetailsPage;
