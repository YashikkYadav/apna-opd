"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "@/app/config/axios";
import DoctorOverviewCar from "@/app/components/profile-com/DoctorOverviewCar";
import DoctorSpecialistsCard from "@/app/components/profile-com/DoctorSpecialistsCard";
import DoctorFeatureCard from "@/app/components/profile-com/DoctorFeatureCard";
import ImageGallery from "@/app/components/profile-com/imageGallery";
import HospitalLocationCard from "@/app/components/more/hospital/HospitalLocationCard";
import DoctorTestimonialsCard from "@/app/components/profile-com/DoctorTestimonialsCard";
import Faqs from "@/app/components/profile-com/faqs";

const ProfilePage = () => {
  const { doctorId } = useParams();
  const [doctorDetail, setDoctorDetail] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/doctor/list?page=1&location=&speciality=`
        );
        const list = response?.list?.doctorList || [];
        const foundDoctor = list.find((item) => item._id === doctorId);
        if (foundDoctor) {
          console.log(foundDoctor);
          setDoctorDetail(foundDoctor);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.log("error", error);
        setNotFound(true);
      }
    };

    fetchData();
  }, [doctorId]);

  if (notFound) {
    return (
      <div className="pt-[80px] text-center text-gray-500 text-lg">
        No data found for the given ID.
      </div>
    );
  }

  if (!doctorDetail) {
    return null; // Or a loader if desired
  }

  return (
    <div className="pt-[80px]">
      <DoctorFeatureCard doctorData={doctorDetail} specs={"doctor"} />
      {/* <DoctorOverviewCar doctorData={doctorDetail} specs={"Doctor Overview"} /> */}
      {/* <DoctorSpecialistsCard doctorData={doctorDetail} /> */}
      <ImageGallery doctorDetail={doctorDetail} />
      <HospitalLocationCard profileData={doctorDetail.doctor} />
      <DoctorTestimonialsCard testimonials={doctorDetail.testimonials} />
      <Faqs doctorDetails={doctorDetail} />
    </div>
  );
};

export default ProfilePage;
