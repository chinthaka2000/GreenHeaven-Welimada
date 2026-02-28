import React, { useEffect } from 'react';
import { Navigation } from '../components/sections/Navigation';
import { Footer } from '../components/sections/Footer';

export function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 font-sans selection:bg-sage-green/30 flex flex-col">
      <Navigation />

      <main className="flex-1 pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-5xl text-forest-moss mb-4">Terms of Service</h1>
          <p className="font-mono text-sm tracking-widest uppercase text-forest-moss/60 mb-12">Last Updated: March 2026</p>

          <div className="space-y-8 text-forest-moss/80 leading-relaxed">
            <section>
              <h2 className="font-serif text-2xl text-forest-moss mb-4">1. Agreement to Terms</h2>
              <p>
                These Terms of Service constitute a legally binding agreement made between you and GreenHaven Welimada concerning your access to and use of our website as well as any other media form related, linked, or otherwise connected thereto. You agree that by accessing the site, you have read, understood, and agreed to be bound by all of these Terms of Service.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-forest-moss mb-4">2. Reservations and Cancellations</h2>
              <p>
                When making a reservation, you agree to provide current, complete, and accurate booking and contact information. We reserve the right to cancel or modify reservations where it appears that a customer has engaged in fraudulent or inappropriate activity or under other circumstances where it appears that the reservations contain or resulted from a mistake or error.
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Check-in time is generally after 2:00 PM, and check-out is before 11:00 AM.</li>
                <li>Cancellations made 7 days or more in advance of the arrival date will receive a 100% refund.</li>
                <li>Cancellations made within 7 days will incur a 50% fee.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-forest-moss mb-4">3. User Conduct</h2>
              <p>
                You may not access or use the Site for any purpose other than that for which we make the Site available. As a user of the Site, you agree not to:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                <li>Make any unauthorized use of the Site, including collecting usernames and/or email addresses of users by electronic or other means.</li>
                <li>Use the Site to advertise or offer to sell goods and services.</li>
                <li>Engage in unauthorized framing of or linking to the Site.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-forest-moss mb-4">4. Intellectual Property Rights</h2>
              <p>
                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-forest-moss mb-4">5. Contact Information</h2>
              <p>
                In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
                <br /><br />
                <strong>Email:</strong> hello@greenhaven.lk<br />
                <strong>Phone:</strong> +94 77 123 4567<br />
                <strong>Address:</strong> Welimada, Sri Lanka
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
