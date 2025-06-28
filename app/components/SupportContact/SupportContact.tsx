'use client';

import { ContactSection } from '../ContactSection/ContactSection';
import { DonationSection } from '../DonatePlatform/DonatePlatform';

export const SupportContact = () => (
  <section className="bg-black border-t border-[#c9ad77]/50 text-[#f5e8c7] py-20 px-6">
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
      <DonationSection />
      <ContactSection />
    </div>
  </section>
);
