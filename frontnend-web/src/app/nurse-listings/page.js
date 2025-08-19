"use client";
import PatientTestimonials from "../components/more/nurse/PatientTestimonials";
import WhyChooseUs from "../components/more/nurse/WhyChooseUs";
import NurseParent from "../components/more/nurse/NurseParent";
import axios from "axios";
import { useState, useEffect } from "react";

const NurseProfile = () => {
  const [nurseDetails, setNurseDetails] = useState({ data: [], total: 0, pages: 0 });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(4);
  const [location, setLocation] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      console.log("mm",location)
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/nurse-listings`,
        { params: { page, limit, location } }
      );
      setNurseDetails(response.data);
    } catch (error) {
      console.error("Error fetching nurse data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, location]);

  const handleSearch = (loc) => {
    setLocation(loc);
    setPage(1); // reset page
  };

  return (
    <div className="relative bg-white min-h-screen flex flex-col items-center">
      <main className="pt-[120px] pb-16 w-full">
        <div className="max-w-[90vw] mx-auto space-y-10">
          {/* 🔍 Pass props down */}
          <NurseParent
            nurses={nurseDetails?.data}
            total={nurseDetails?.total}
            page={page}
            pages={nurseDetails?.pages}
            loading={loading}
            onSearch={handleSearch}
            onPageChange={setPage}
          />

          <WhyChooseUs showFeatures={nurseDetails?.features} />
          <PatientTestimonials testimonials={nurseDetails?.testimonials} />
        </div>
      </main>
    </div>
  );
};

export default NurseProfile;
