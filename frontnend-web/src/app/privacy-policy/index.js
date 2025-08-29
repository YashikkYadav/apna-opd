import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">
        Privacy Policy for Apna-OPD.com
      </h1>
      <p className="text-gray-600 mb-6 text-center">Effective Date: [Insert Date]</p>

      <div className="space-y-6 text-gray-800 leading-relaxed">
        <p>
          At <strong>Apna-OPD.com</strong>, we respect your privacy and are committed
          to protecting your personal information. This Privacy Policy explains
          how we collect, use, disclose, and safeguard your data when you use
          our website, mobile application, and services related to medical
          professionals, physiotherapists, hospitals, medical stores, and other
          healthcare-related services.
        </p>

        <section>
          <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
          <p><strong>a) Personal Information:</strong> Name, phone number, email, gender, age, address, ID details.</p>
          <p><strong>b) Medical Information:</strong> Appointment history, prescriptions, uploaded medical docs.</p>
          <p><strong>c) Technical Info:</strong> Device details, browser, IP, cookies, usage analytics.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
          <ul className="list-disc ml-6">
            <li>Provide healthcare services, appointments, and consultations</li>
            <li>Maintain medical history and records</li>
            <li>Send updates, reminders, and offers</li>
            <li>Improve our platform and services</li>
            <li>Ensure safety and fraud prevention</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Sharing of Information</h2>
          <p>
            We do <strong>not</strong> sell or rent your information. Data may be shared with:
          </p>
          <ul className="list-disc ml-6">
            <li>Doctors, hospitals, and medical providers (to complete bookings)</li>
            <li>Pharmacy, labs, and service partners</li>
            <li>Legal authorities (if required by law)</li>
            <li>Business transfers like mergers or acquisitions</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
          <p>
            We use industry-standard measures to protect your data. However, no
            system is 100% secure. Keep your login credentials safe.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
          <ul className="list-disc ml-6">
            <li>Access, correct, or update your data</li>
            <li>Request deletion of your account/info</li>
            <li>Withdraw consent for certain processing</li>
            <li>Opt-out of marketing messages</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. Cookies & Tracking</h2>
          <p>
            We use cookies to personalize your experience and analyze traffic.
            You may control cookies via browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">7. Third-Party Links</h2>
          <p>
            Our platform may contain links to third-party sites. We are not
            responsible for their privacy practices. Review their policies
            separately.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">8. Children’s Privacy</h2>
          <p>
            Services are not directed to children under 18 without parental
            consent. If we discover child data collected unknowingly, we will
            delete it promptly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">9. Updates to Policy</h2>
          <p>
            We may update this policy from time to time. The latest version will
            always be available with a "Last Updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, contact us at:
          </p>
          <p>Email: <a href="mailto:support@apna-opd.com" className="text-blue-600 underline">support@apna-opd.com</a></p>
          <p>Address: [Insert Business Address]</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
