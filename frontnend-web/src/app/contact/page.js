import BannerWithTitle from "../components/common-components/banner-with-title";
import Contact from "../components/contact-com/contact";

const ContactPage = () => {
  return (
    <div className="pt-[80px]">
      <div className="bg-[#0D7EB7] banner-with-search">
        <div className="bg-[url('/images/gradient.svg')] bg-no-repeat bg-right">
          <div className="max-w-[1270px] px-[15px] sm:px-[30px] mx-auto relative md:h-[570px]">
            <div className="flex justify-between items-end pt-[60px] pb-[60px] md:pt-[120px] md:pb-0">
              <div className="max-w-[600px]">
                <h1 className="title-64 mb-[32px] max-w-[570px]">Contact Us</h1>
                <p className="text-base text-white mb-[16px]">
                  Have a health concern, a question about appointments, or need
                  help navigating Apna OPD? You’re not alone — and you don’t
                  have to figure it out on your own.
                </p>
                <p className="text-base text-white mb-[32px]">
                  Whether you're trying to find a trusted doctor online, book an
                  OPD appointment, or simply need support with your account, our
                  team is just a message away. At Apna OPD, your care and
                  convenience come first.
                </p>

                {/* 👇 New Contact Info Section */}
                <div className="space-y-4">
                  <div className="text-white text-base">
                    <span className="font-bold mr-2">📞 Talk to Us</span>
                    <br />
                    Need immediate assistance? Call us at{" "}
                    <span className="underline">+91 XXXXX XXXXX</span>
                  </div>
                  <div className="text-white text-base">
                    <span className="font-bold mr-2">📧 Email Support</span>
                    <br />
                    Write to us at{" "}
                    <a href="mailto:support@apnaopd.in" className="underline">
                      support@apnaopd.in
                    </a>{" "}
                    and we’ll respond within 24 hours.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Contact isCareer={false} />
    </div>
  );
};

export default ContactPage;
