export const dynamic = "force-static";

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <section className="flex flex-col gap-6 mt-5">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Overview</h2>
          <p>
            Luxign respects your privacy and is committed to protecting your
            personal data. This Privacy Policy explains how we collect, use, and
            safeguard your information when you use our AI-powered interior
            design platform.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            2. Information We Collect
          </h2>
          <ul className="list-disc ml-6">
            <li>Images you upload for interior design generation</li>
            <li>Basic usage data (device, browser, interactions)</li>
            <li>Optional account information (email, name)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. How We Use Data</h2>
          <ul className="list-disc ml-6">
            <li>To generate AI-powered interior designs</li>
            <li>To improve platform performance and features</li>
            <li>To ensure system security and prevent abuse</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. Data Storage</h2>
          <p>
            Uploaded images are processed securely and stored only for the
            purpose of generating results. We do not sell personal data.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            5. Third-Party Services
          </h2>
          <p>
            Luxign may use third-party AI and cloud services to process images
            and generate results. These providers follow strict data protection
            standards.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">6. Contact</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at <span className="font-medium">support@luxign.ai</span>
          </p>
        </div>
      </section>
    </main>
  );
}
