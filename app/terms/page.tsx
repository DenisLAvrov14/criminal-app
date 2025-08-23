// File: app/terms/page.tsx

import React from 'react';
import { CloseButton } from '@/app/ui/CloseButton/CloseButton';

export const metadata = {
  title: 'Terms of Service — Russian Prison Culture',
  description: 'Terms of Service for Russian Prison Culture',
};

export default function TermsPage() {
  return (
    <main className="relative bg-black text-[#f5e8c7] min-h-screen py-12 px-4 md:px-16">
      <CloseButton />
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">Terms of Service</h1>

        {/* 1. Acceptance */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Russian Prison Culture website (&quot;Site&quot;), you agree to be bound
            by these Terms of Service and all applicable laws and regulations. If you do not agree,
            please do not use the Site.
          </p>
        </section>

        {/* 2. Intellectual Property */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">2. Intellectual Property</h2>
          <p>
            All content on the Site, including text, graphics, logos, images, and software, is the
            property of Russian Prison Culture or its licensors and is protected by copyright and
            other intellectual property laws. You may view and download materials for personal,
            non-commercial use only.
          </p>
        </section>

        {/* 3. Donations and Payments */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">3. Donations and Payments</h2>
          <p>
            Donations are processed by third-party payment providers. All donations are final and
            non-refundable, except in cases of fraud or error.
          </p>
        </section>

        {/* 4. User Conduct */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">4. User Conduct</h2>
          <p>
            You agree not to use the Site for any unlawful purpose or to post any content that is
            offensive, defamatory, or violates the rights of others. You must keep any account
            credentials secure and notify us of any unauthorized use.
          </p>
        </section>

        {/* 5. Limitation of Liability */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">5. Limitation of Liability</h2>
          <p>
            The Site is provided &quot;as is&quot; without warranties of any kind. Russian Prison Culture will
            not be liable for any damages arising from your use of the Site.
          </p>
        </section>

        {/* 6. External Links */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">6. External Links</h2>
          <p>
            The Site may contain links to third-party websites. We do not endorse and are not
            responsible for their content or policies.
          </p>
        </section>

        {/* 7. Governing Law */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">7. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of [State], USA. Any disputes shall be
            resolved in the courts of that jurisdiction.
          </p>
        </section>

        {/* 8. Changes to Terms */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">8. Changes to Terms</h2>
          <p>
            We may update these Terms at any time. The effective date above will reflect changes.
            Continued use of the Site signifies acceptance.
          </p>
        </section>

        {/* 9. Contact Us */}
        <section className="space-y-2 pb-12">
          <h2 className="text-2xl font-semibold">9. Contact Us</h2>
          <p>
            For questions about these Terms, please contact us at{' '}
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
