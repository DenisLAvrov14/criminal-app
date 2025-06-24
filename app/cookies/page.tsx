// app/cookies/page.tsx (server component)
import React from 'react';
import { CloseButton } from '../ui/CloseButton/CloseButton';

export default function CookiePolicyPage() {
  return (
    <main className="relative bg-black text-[#f5e8c7] min-h-screen py-12 px-4 md:px-16">
      <CloseButton />
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">Cookie Policy</h1>
        <p className="text-center text-sm">Last updated: [Date]</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. What Are Cookies</h2>
          <p>
            Cookies are small text files stored on your device when you visit websites. They help us
            remember your preferences and provide a better browsing experience.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Types of Cookies We Use</h2>
          <ul className="list-disc list-inside space-y-2 text-left">
            <li>
              <strong>Necessary Cookies:</strong> Essential for site functionality (e.g., session
              management).
            </li>
            <li>
              <strong>Analytics Cookies:</strong> Help us understand website performance and usage
              (e.g., Google Analytics).
            </li>
            <li>
              <strong>Advertising Cookies:</strong> Used by third-party ad networks to deliver
              targeted ads.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Third-Party Cookies</h2>
          <p>
            We may allow third-party services to set cookies on our site, such as analytics and
            advertising partners. These cookies are governed by the privacy policies of those
            services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. How to Control Cookies</h2>
          <p>
            You can manage or delete cookies using your browser settings. Below are links to
            instructions for popular browsers:
          </p>
          <ul className="list-disc list-inside space-y-2 text-left">
            <li>
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                Chrome
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                Firefox
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                Safari
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/en-us/topic/how-to-delete-cookies-in-microsoft-edge-63947406-40ac-c3b3-57b9-2a946a29ae09"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                Edge
              </a>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Effects of Disabling Cookies</h2>
          <p>
            Disabling cookies may limit certain features and reduce functionality on the site. You
            may not be able to access some content or personalize your experience.
          </p>
        </section>

        <section className="space-y-4 pb-12">
          <h2 className="text-2xl font-semibold">6. Contact Us</h2>
          <p>
            If you have any questions about our Cookie Policy, please contact us at{' '}
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
