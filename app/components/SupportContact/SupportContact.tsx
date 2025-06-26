'use client';

import { Coffee, Heart, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

// Ensure TypeScript recognizes gtag on window
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const DONATE_PLATFORMS = [
  { name: 'Ko-fi', url: 'https://ko-fi.com/your_page', icon: <Coffee size={20} /> },
  {
    name: 'Buy Me a Coffee',
    url: 'https://buymeacoffee.com/your_page',
    icon: <Coffee size={20} />,
  },
  { name: 'Crypto', url: 'https://your_crypto_donation_link', icon: <Globe size={20} /> },
];

export const SupportContact = () => (
  <section className="bg-black border-t border-[#c9ad77]/50 text-[#f5e8c7] py-20 px-6">
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
      {/* Support Section */}
      <div>
        <h2 className="text-4xl font-bold text-[#c9ad77] mb-6">Support the Project</h2>
        <p className="mb-8 text-lg leading-relaxed">
          Fuel our research and help us unveil more untold stories from Russia’s prison world.
          Choose your way to contribute:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DONATE_PLATFORMS.map(({ name, url, icon }) => (
            <motion.a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 bg-[#1a1a1a] text-[#c9ad77] font-semibold rounded-2xl shadow-md hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c9ad77]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Donate via ${name}`}
              onClick={() => window.gtag?.('event', 'donate_click', { method: name })}
            >
              {icon}
              <span>Donate via {name}</span>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div>
        <h2 className="text-4xl font-bold text-[#c9ad77] mb-6">Contact the Author</h2>
        <p className="mb-8 text-lg leading-relaxed">Questions? Feedback? Drop me a line below.</p>
        <form
          className="space-y-6 max-w-xl"
          onSubmit={e => {
            e.preventDefault();
            window.gtag?.('event', 'contact_submit'); /* handle form submit */
          }}
        >
          {[
            { label: 'Name', type: 'text', placeholder: 'Your name' },
            { label: 'Email', type: 'email', placeholder: 'you@example.com' },
            { label: 'Message', type: 'textarea', placeholder: 'Your message...' },
          ].map(field => (
            <div key={field.label}>
              <label
                className="block text-[#ddd] mb-2 font-medium"
                htmlFor={field.label.toLowerCase()}
              >
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  id={field.label.toLowerCase()}
                  rows={5}
                  required
                  placeholder={field.placeholder}
                  className="w-full px-5 py-3 bg-[#1a1a1a] text-[#ddd] border border-[#c9ad77] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9ad77]"
                />
              ) : (
                <input
                  id={field.label.toLowerCase()}
                  type={field.type}
                  required
                  placeholder={field.placeholder}
                  className="w-full px-5 py-3 bg-[#1a1a1a] text-[#ddd] border border-[#c9ad77] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9ad77]"
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full px-8 py-4 bg-[#c9ad77] text-black font-semibold rounded-2xl shadow-lg hover:shadow-2xl transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c9ad77]"
          >
            <Heart size={20} />
            Send Message
          </button>
        </form>
      </div>
    </div>
  </section>
);
