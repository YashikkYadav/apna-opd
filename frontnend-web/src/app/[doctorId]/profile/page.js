"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "@/app/config/axios";
import ImageGallery from "../components/profile-com/DocImageGallery";
import HospitalLocationCard from "../components/more/hospital/HospitalLocationCard";
import DoctorFeatureCard from "../components/profile-com/DoctorFeatureCard";
import DoctorOverviewCar from "../components/profile-com/DoctorOverviewCar";
import DoctorTestimonialsCard from "../components/profile-com/DoctorTestimonialsCard";
import DoctorSpecialistsCard from "../components/profile-com/DoctorSpecialistsCard";

const ProfilePage = () => {
  const params = useParams();
  const doctorId = params.doctorId;
  const [doctorDetail, setDoctorDetail] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        `/doctor/list?page=1&location=&speciality=`
      );
      if (response.list?.doctorList) {
        const doctorDetail = response.list.doctorList;
        doctorDetail.forEach((item) => {
          if (item._id === doctorId) {
            setDoctorDetail(item);
          }
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="pt-[80px]">
      <DoctorFeatureCard doctorData={doctorDetail} />
      <DoctorOverviewCar doctorData={doctorDetail} />
      <DoctorSpecialistsCard doctorData={doctorDetail} />
      <ImageGallery images={doctorDetail.images} />
      <HospitalLocationCard hospitalData={doctorDetail} />
      <DoctorTestimonialsCard testimonials={doctorDetail.testimonials} />
      <Faqs doctorDetails={doctorDetail} />
    </div>
  );
};

export default ProfilePage;
