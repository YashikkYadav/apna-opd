"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import AppointmentModal from "../common-components/AppointmentModal";
import RatingModal from "../common-components/RatingModal";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "@/app/config/axios";
const Banner = ({ doctorDetail }) => {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showRateModal, setShowRateModal] = useState(false);

  const isDateUnavailable = (date) => {
    if (!doctorDetail?.unavailabilityDate) return false;
    const checkDate = new Date(date);
    const fromDate = new Date(doctorDetail.unavailabilityDate.from);
    const toDate = new Date(doctorDetail.unavailabilityDate.to);
    return checkDate >= fromDate && checkDate <= toDate;
  };

  const getNextAvailableDate = () => {
    const today = new Date();
    const availableAfterDays = doctorDetail?.availabilityAfter || 0;
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + availableAfterDays);
    return nextDate;
  };

  const formatSchedule = () => {
    const location = doctorDetail?.locations?.[0];
    if (!location) return {};

    const schedule = {};
    const nextAvailableDate = getNextAvailableDate();
    let currentDate = new Date(nextAvailableDate);
    let daysFound = 0;
    let maxDays = 14;

    while (daysFound < 7 && maxDays > 0) {
      const dayName = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
      });
      if (location.days.includes(dayName) && !isDateUnavailable(currentDate)) {
        schedule[dayName] = {
          time: `${location.from} - ${location.to}`,
          date: new Date(currentDate),
        };
        daysFound++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
      maxDays--;
    }

    return schedule;
  };

  const doctorDetails = {
    name: doctorDetail?.doctor?.name,
    specialty: doctorDetail?.doctor?.speciality,
    doctorId: doctorDetail?.doctor?._id,
    locations: doctorDetail?.locations || [],
    schedule: formatSchedule(),
    timeslot: doctorDetail?.locations?.[0]?.timeslot || 15,
    unavailabilityDate: doctorDetail?.unavailabilityDate,
    availabilityAfter: doctorDetail?.availabilityAfter,
  };

  const handleRatingSubmit = async ({ rating, feedback }) => {
    try {
      const response = await axiosInstance.post(`/doctor/rating`, {
        doctorId: doctorDetail?.doctor?._id,
        rating,
      });
      if (response.status === 200) {
        toast.success("Rating submitted successfully");
        setShowRateModal(false);
      } else {
        toast.error("Failed to submit rating. Please try again.");
      }
    } catch (error) {
      console.log("Error submitting rating:", error);
      toast.error("Failed to submit rating. Please try again.");
    }
  };

  return (
    <>
      <div className="bg-[#0B66A1] banner-with-search">
        <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto">
          <div className="flex flex-col pt-[60px] md:pt-[96px] pb-[60px] lg:pb-0">
            <div className="title-24 text-white flex mb-[56px] flex-col sm:flex-row gap-[10px] sm:gap-0">
              <span>Home </span>{" "}
              <Image
                className="-rotate-90 mx-[8px]"
                src="/images/down_arrow_white.svg"
                width={17}
                height={10}
                alt="Down Arrow"
              />
              <span>{doctorDetail?.doctor?.name}</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0">
              <div className="flex lg:mr-[20px]">
                <Image
                  src={doctorDetail?.images[0]?.url ?? "/images/image_placeholder.svg"}
                  width={504}
                  height={608}
                  alt="Doctor Image"
                  className="h-[400px] md:h-[604px] object-cover rounded-t-[8px] rounded-b-[8px] lg:rounded-b-none"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="mb-[32px]">
                  <h2 className="title-48 !text-white mb-[8px]">
                    {doctorDetail?.doctor?.name}
                  </h2>
                  <h5 className="title-24 text-white !font-medium">
                    {doctorDetail?.doctor?.speciality}
                  </h5>
                </div>
                <div className="mb-[32px]">
                  <h5 className="title-24 text-white mb-[8px]">
                    {doctorDetail?.doctor?.clinicName}
                  </h5>
                  <p className="text-base text-white !font-normal">
                    {doctorDetail?.doctor?.address}
                  </p>
                </div>
                <div className="mb-[32px]">
                  <h5 className="title-24 text-white mb-[8px]">
                    Make an Appointment
                  </h5>
                  <div className="flex flex-col md:flex-row gap-[16px] md:gap-[56px]">
                    {Object.entries(doctorDetails.schedule)?.map(
                      ([day, time]) => (
                        <div key={day}>
                          <p className="text-base text-white !font-normal">
                            {day}
                          </p>
                          <p className="text-base text-white font-bold">
                            {time.time}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                  {doctorDetail?.unavailabilityDate && (
                    <div className="mt-4">
                      <p className="text-sm text-[#FFD700] !font-medium">
                        Not available from{" "}
                        {new Date(
                          doctorDetail.unavailabilityDate.from
                        ).toLocaleDateString()}
                        to{" "}
                        {new Date(
                          doctorDetail.unavailabilityDate.to
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
                <div className="mb-[10px]">
                  <h3 className="title-32 text-white">
                    Consultation Cost : $25
                  </h3>
                </div>
                <div className="flex flex-col sm:flex-row gap-[15px] mb-5">
                  <button
                    onClick={() => setShowAppointmentModal(true)}
                    className="bg-[#3DB8F5] px-[31px] py-[10px] rounded-[8px] text-base text-white font-bold hover:bg-[#69b6ff] hover:text-white"
                  >
                    Make an Appointment
                  </button>
                  <button
                    onClick={() => setShowRateModal(true)}
                    className="underline px-[31px] py-[10px] rounded-[8px] text-base text-white font-bold hover:text-white"
                  >
                    Want to Rate?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AppointmentModal
        doctorDetails={doctorDetails}
        visible={showAppointmentModal}
        onClose={() => setShowAppointmentModal(false)}
      />

      <RatingModal
        visible={showRateModal}
        onClose={() => setShowRateModal(false)}
        onSubmit={handleRatingSubmit}
      />
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={2000}
      />
    </>
  );
};

export default Banner;
