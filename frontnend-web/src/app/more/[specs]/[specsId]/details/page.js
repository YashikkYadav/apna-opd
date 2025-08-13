"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import AboutCommon from "../../../../components/more/common/AboutCommon";
import BannerCommon from "../../../../components/more/common/BannerCommon";
import ImageGalleryCommon from "../../../../components/more/common/ImageGalleryCommon";
import SuggestedService from "../../../../components/more/common/SuggestedService";
import Loader from "../../../../components/common-components/Loader";
import axiosInstance from "@/app/config/axios";
import FullDetailsPage from "@/app/components/more/hospital/hospitalDetail";
import axios from "axios";

const DetailsPage = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  let specs = params.specs;
  const specsId = params.specsId;
  if (specs === "nurse") {
    specs = "nursing_staff";
  }

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      console.log(`/health-serve/list?&location=&type=${specs}`);
      // const listResponse = await axiosInstance.get(
      //   `/health-serve/list?&location=&type=${specs}`
      // );

      // console.log(listResponse);

      // if (!listResponse?.list?.healthServeProfileList) {
      //   setError(`No data found for ${specs}`);
      //   return;
      // }

      // const basicProfile = listResponse?.list?.healthServeProfileList?.find(
      //   (item) => item._id === specsId
      // );

      // if (!basicProfile) {
      //   setError(`No data found for ${specs} with ID ${specsId}`);
      //   return;
      // }

      const detailResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${specsId}/health-serve-profile/profile-data`
      );
      console.log("m", detailResponse);
      if (
        !detailResponse?.data?.healthServeProfileData?.healthServeProfile?.data
      ) {
        setError(process.env.NEXT_CLIENT_PROFILE_COMING_SOON_MESSAGE);
      }

      const healthServeProfile =
        detailResponse?.data?.healthServeProfileData?.healthServeProfile?.data;

      const healthServeId =
        detailResponse?.data?.healthServeProfileData?.healthServeUser;

      console.log("f", healthServeId, healthServeProfile);
      if (healthServeProfile) {
        setProfileData({
          ...healthServeId,
          ...healthServeProfile,
        });
      } else {
        // setProfileData(basicProfile);
      }
    } catch (error) {
      console.log("Error fetching service details:", error);
      setError(process.env.NEXT_CLIENT_PROFILE_COMING_SOON_MESSAGE);
    } finally {
      setLoading(false);
    }
  }, [specs, specsId]);

  useEffect(() => {
    console.log({ specs, specsId });
    if (specs && specsId) {
      fetchData();
    }
  }, [fetchData, specs, specsId]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="pt-[120px] text-center">
        <h2 className="text-2xl text-red-500">{error}</h2>
      </div>
    );
  }

  if (specs === "hospital") {
    console.log(profileData);
    return <FullDetailsPage profileData={profileData} />;
  }

  return (
    <div className="pt-[80px]">
      <BannerCommon profileData={profileData} serviceType={specs} />
      <AboutCommon profileData={profileData} serviceType={specs} />
      {profileData?.images?.length > 0 && (
        <ImageGalleryCommon images={profileData?.images} />
      )}
      <SuggestedService serviceType={specs} currentId={specsId} />
    </div>
  );
};

export default DetailsPage;
