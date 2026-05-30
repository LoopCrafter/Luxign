export const dynamic = "force-static";

export default function TermsOfServicePage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

      <section className="space-y-6 flex flex-col gap-6 mt-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Luxign, you agree to be bound by these Terms
            of Service. If you do not agree, please do not use the platform.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. Use of Service</h2>
          <p>
            Luxign provides AI-powered interior design generation tools. You
            agree to use the service only for lawful and personal or commercial
            design purposes.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. User Content</h2>
          <p>
            You retain ownership of images you upload. By uploading content, you
            grant Luxign permission to process it for AI generation.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. Limitations</h2>
          <ul className="list-disc ml-6">
            <li>We do not guarantee 100% accurate AI results</li>
            <li>Service may occasionally be unavailable or updated</li>
            <li>We are not responsible for misuse of generated content</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Prohibited Use</h2>
          <ul className="list-disc ml-6">
            <li>Uploading illegal or harmful content</li>
            <li>Attempting to reverse engineer the system</li>
            <li>Abusing or overloading the service</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">6. Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of Luxign
            means you accept the updated terms.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">7. Contact</h2>
          <p>
            For any questions, contact us at{" "}
            <span className="font-medium">legal@luxign.ai</span>
          </p>
        </div>
      </section>
    </main>
  );
}
