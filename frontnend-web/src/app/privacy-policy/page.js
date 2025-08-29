// pages/privacy-policy.js

import Head from "next/head";

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Head>
        <title>Privacy Policy - Apna-OPD</title>
        <meta
          name="description"
          content="Privacy Policy of Apna-OPD.com, providing medical services like doctors, hospitals, physiotherapy, and more."
        />
      </Head>

      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
          <p>
            We may collect personal information like your name, contact details, medical history, appointment details, and technical information such as IP address, browser type, and cookies.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
          <p>
            Your data is used to provide healthcare services, maintain records, communicate updates, improve our platform, and ensure security.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">3. Sharing of Information</h2>
          <p>
            We do not sell or rent your information. We may share it with medical providers, service partners, for legal compliance, or in case of business transfers.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">4. Data Security</h2>
          <p>
            We use industry-standard measures to protect your data. However, no system is 100% secure. Keep your login credentials confidential.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">5. Your Rights</h2>
          <p>
            You can access, correct, delete your data, withdraw consent, and opt out of marketing communications depending on your location.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">6. Cookies & Tracking</h2>
          <p>
            We use cookies to enhance user experience, analyze traffic, and personalize services. You can manage cookies via your browser settings.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">7. Third-Party Links</h2>
          <p>
            Our platform may contain links to third-party websites. We are not responsible for their privacy practices. Review their privacy policies separately.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">8. Children’s Privacy</h2>
          <p>
            Our services are not directed to children under 18. If we collect such data unintentionally, we will delete it promptly.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">9. Updates</h2>
          <p>
            We may update this Privacy Policy occasionally. The latest version will always be available on our website with the last updated date.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">10. Contact Us</h2>
          <p>
            For any questions, reach us at:
            <br />
            📧 Email: <a className="text-blue-600" href="mailto:support@apna-opd.com">support@apna-opd.com</a>
            <br />
            📍 Address: [Insert Business Address]
          </p>
        </section>
      </div>
    </div>
  );
}
