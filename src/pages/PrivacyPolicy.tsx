import React, { useEffect } from 'react';
import { Navigation } from '../components/sections/Navigation';
import { Footer } from '../components/sections/Footer';
import { SEO } from '../components/SEO';

export function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title="Privacy Policy | Green Heaven Welimada" 
        description="Privacy Policy for Green Heaven Welimada. Read about how we collect, use, and protect your personal data." 
        url="https://greenheaven.lk/privacy-policy"
      />
      <div className="min-h-screen bg-stone-50 font-sans selection:bg-sage-green/30 flex flex-col">
      <Navigation />

      <main className="flex-1 pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-5xl text-forest-moss mb-4">Privacy Policy</h1>
          <p className="font-mono text-sm tracking-widest uppercase text-forest-moss/60 mb-12">Last Updated: March 2026</p>

          <div className="space-y-8 text-forest-moss/80 leading-relaxed">
            <section>
              <h2 className="font-serif text-2xl text-forest-moss mb-4">1. Introduction</h2>
              <p>
                Welcome to greenheaven Welimada. We respect your privacy and are committed to protecting your personal data.
                This privacy policy will inform you as to how we look after your personal data when you visit our website
                and tell you about your privacy rights.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-forest-moss mb-4">2. The Data We Collect</h2>
              <p>
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
                <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products and services you have purchased from us (e.g., bookings).</li>
                <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-forest-moss mb-4">3. How We Use Your Data</h2>
              <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., processing your reservation).</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those интересы.</li>
                <li>Where we need to comply with a legal or regulatory obligation.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-forest-moss mb-4">4. Data Security</h2>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-forest-moss mb-4">5. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our privacy practices, please contact us at:
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
    </>
  );
}
