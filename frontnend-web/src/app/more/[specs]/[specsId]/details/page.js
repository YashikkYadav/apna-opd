"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AboutCommon from "../../../../components/more/common/AboutCommon";
import BannerCommon from "../../../../components/more/common/BannerCommon";
import ImageGalleryCommon from "../../../../components/more/common/ImageGalleryCommon";
import SuggestedService from "../../../../components/more/common/SuggestedService";
import Loader from "../../../../components/common-components/Loader";
import axiosInstance from "@/app/config/axios";
import HospitalFeatureCard from '@/app/components/more/hospital/HospitalFeatureCard'
import HospitalOverviewCard from '@/app/components/more/hospital/HospitalOverviewCard'
import HospitalDepartmentsCard from '@/app/components/more/hospital/HospitalDepartmentsCard'
import HospitalDoctorsCard from '@/app/components/more/hospital/HospitalDoctorsCard'
import HospitalFacilitiesCard from '@/app/components/more/hospital/HospitalFacilitiesCard'
import HospitalInsuranceCard from '@/app/components/more/hospital/HospitalInsuranceCard'
import HospitalLocationCard from '@/app/components/more/hospital/HospitalLocationCard'
import HospitalTestimonialsCard from '@/app/components/more/hospital/HospitalTestimonialsCard'
import HospitalQuickActionsCard from '@/app/components/more/hospital/HospitalQuickActionsCard'

import { FaBed, FaUserMd } from "react-icons/fa";
import { MdEmergency } from "react-icons/md";
import { BsShieldCheck } from "react-icons/bs";
import { RiBankCardLine } from "react-icons/ri";

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

      console.log(listResponse);

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
          ...detailResponse.healthServeProfile
        });
      } else {
        setProfileData(basicProfile);
      }

    } catch (error) {
      console.log("Error fetching service details:", error);
      setError(error?.response?.data?.error?.message || "Failed to load details. Please try again later.");
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

  return (
    console.log(specs),
    specs === 'hospital' ? (
      <div className="pt-24">
        <HospitalFeatureCard hospitalData={profileData} />
        <HospitalOverviewCard hospitalData={profileData} />
        <HospitalDepartmentsCard hospitalData={profileData} />
        <HospitalDoctorsCard hospitalData={profileData} />
        <HospitalFacilitiesCard hospitalData={profileData} />
        <HospitalInsuranceCard hospitalData={profileData} />
        <HospitalLocationCard hospitalData={profileData} />
        <HospitalTestimonialsCard hospitalData={profileData} />
        <HospitalQuickActionsCard hospitalData={profileData} />
      </div>
    ) : (
      console.log(profileData),
      <div className="pt-[80px]">
        <BannerCommon 
          profileData={profileData} 
          serviceType={specs} 
        />
        <AboutCommon 
          profileData={profileData} 
          serviceType={specs} 
        />
        {profileData?.images && profileData.images.length > 0 && (
          <ImageGalleryCommon 
            images={profileData.images}
          />
        )}
        <SuggestedService 
          serviceType={specs}
          currentId={specsId}
        />
      </div>
    )
  );
};

export default DetailsPage;
