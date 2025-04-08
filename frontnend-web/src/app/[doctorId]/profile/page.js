"use client";
import { useParams } from "next/navigation";
import AboutDoctor from "../../components/profile-com/aboutDoctor";
import Banner from "../../components/profile-com/banner";
import ImageGallery from "../../components/profile-com/imageGallery";
import OtherSpecialist from "../../components/profile-com/otherSpecialist";
import { useEffect, useState } from "react";
import axiosInstance from "@/app/config/axios";

const ProfilePage = () => {
  const params = useParams();
  const doctorId = params.doctorId;
  const [doctorDetail, setDoctorDetail] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        `/doctor/list?page=1&location=&speciality=`
      );
      if (response.list?.doctorListData) {
        const doctorDetail = response.list.doctorListData;
        console.log("doctorDetailcsdfdsf", doctorDetail);
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
      <Banner doctorDetail={doctorDetail} />
      <AboutDoctor doctorDetail={doctorDetail} />
      <ImageGallery doctorDetail={doctorDetail} />
      <OtherSpecialist doctorDetail={doctorDetail} />
    </div>
  );
};

export default ProfilePage;
