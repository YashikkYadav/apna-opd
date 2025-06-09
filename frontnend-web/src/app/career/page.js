import BannerWithTitle from "../components/common-components/banner-with-title";
import Contact from "../components/contact-com/contact";
import CareerForm from "../components/contact-com/career";

const CareerPage = () => {
  return (
    <div className="pt-[80px]">
      <div className="bg-[#0D7EB7] banner-with-search">
        <div className="bg-[url('/images/gradient.svg')] bg-no-repeat bg-right">
          <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto relative md:h-[570px]">
            <div className="flex justify-between items-end pt-[60px] pb-[60px] md:pt-[12px] md:pb-0">
              <div className="max-w-[600px]">
                <h1 className="title-64 mb-[32px] max-w-[570px]">
                  Careers at Apna OPD
                </h1>
                <p className="text-base text-white mb-[16px]">
                  At Apna OPD, we believe people are the heart of everything we
                  do. Whether you're starting out or looking to grow your
                  career, we’re always looking for passionate individuals to
                  join our mission.
                </p>
                <p className="text-base text-white mb-[32px]">
                  From healthcare to technology, if you're driven by purpose and
                  want to make an impact, we’d love to hear from you. Let’s
                  build the future of digital healthcare — together.
                </p>

                {/* 👇 Contact Info for Career Inquiries */}
                <div className="space-y-4">
                  <div className="text-white text-base">
                    <span className="font-bold mr-2">📧 Career Inquiries</span>
                    <br />
                    Interested in joining us? Reach out at{" "}
                    <a href="mailto:careers@apnaopd.in" className="underline">
                      careers@apnaopd.in
                    </a>
                  </div>
                  <div className="text-white text-base">
                    <span className="font-bold mr-2">
                      🌐 Explore Opportunities
                    </span>
                    <br />
                    Check out our current openings and apply today.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CareerForm />
    </div>
  );
};

export default CareerPage;
