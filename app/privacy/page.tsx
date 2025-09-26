// File: app/privacy/page.tsx

import React from 'react';
import { CloseButton } from '@/app/ui/CloseButton/CloseButton';

export const metadata = {
  title: 'Privacy Policy — Russian Prison Culture',
  description: 'Privacy Policy of Russian Prison Culture',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="relative bg-black text-[#f5e8c7] min-h-screen py-8 px-4 md:px-16">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold mb-2 text-center">Privacy Policy</h1>

        <CloseButton />
        {/* 1. Information We Collect */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
          <ul className="list-disc list-inside space-y-1 text-left">
            <li>
              <strong>Email address</strong> when you subscribe, donate, or contact the author.
            </li>
            <li>
              <strong>IP address and technical data</strong> for analytics purposes (e.g., Google
              Analytics).
            </li>
            <li>
              <strong>Cookies and similar tracking technologies</strong> for site functionality,
              preferences, and advertising.
            </li>
          </ul>
        </section>

        {/* 2. How We Use Your Information */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-1 text-left">
            <li>To send newsletters and notifications via email.</li>
            <li>To process donations through third-party payment processors.</li>
            <li>To perform analytics and improve our services.</li>
            <li>To personalize advertising across networks.</li>
          </ul>
        </section>

        {/* 3. Data Sharing */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">3. Data Sharing</h2>
          <p className="text-left">We may share your information with:</p>
          <ul className="list-disc list-inside space-y-1 text-left">
            <li>Email service providers for newsletters.</li>
            <li>Payment processors for donation handling.</li>
            <li>Google for analytics and ads.</li>
            <li>Advertising partners for targeted ads.</li>
          </ul>
        </section>

        {/* 4. Data Retention and Security */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">4. Data Retention and Security</h2>
          <p className="text-left">
            We store your data on secure servers managed by our providers. We use TLS encryption and
            regular backups. You may request deletion or correction of your personal data by
            contacting us at{' '}
            <a href="mailto:email@example.com" className="underline hover:text-white">
              email@example.com
            </a>
            .
          </p>
        </section>

        {/* 5. Your Rights */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">5. Your Rights</h2>
          <p className="text-left">
            If you are a California resident, you have the right to request access, correction, or
            deletion of your personal data, and to opt-out of its sale. To exercise these rights,
            please contact us.
          </p>
        </section>

        {/* 6. Changes to This Policy */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">6. Changes to This Policy</h2>
          <p className="text-left">
            We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date
            at the top will reflect amendments.
          </p>
        </section>

        {/* 7. Contact Us */}
        <section className="space-y-2 pb-8">
          <h2 className="text-2xl font-semibold">7. Contact Us</h2>
          <p className="text-left">
            For any questions about this policy, please contact us at{' '}
            <a href="mailto:email@example.com" className="underline hover:text-white">
              email@example.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
