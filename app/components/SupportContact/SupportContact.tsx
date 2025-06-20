const SUP_METHODS = ['PayPal', 'Credit Card', 'Crypto'];
export const SupportContact = () => (
  <section className="bg-black border-t border-[#c9ad77]/50 text-[#f5e8c7] py-16 px-6">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <h2 className="text-3xl font-bold text-[#c9ad77] mb-4">Support the Project</h2>
        <p className="mb-6 text-base">
          Your donation helps us uncover and share more of Russia’s prison history.
        </p>
        <div className="flex flex-wrap gap-4">
          {SUP_METHODS.map(m => (
            <button
              key={m}
              className="px-6 py-2 bg-[#111] text-[#c9ad77] font-semibold rounded-lg transition-shadow hover:shadow-lg hover:shadow-[#c9ad77]/40 hover:bg-[#c9ad77] hover:text-black"
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-bold text-[#c9ad77] mb-4">Contact the Author</h2>
        <p className="mb-6 text-base">Have questions or feedback? Send me a message.</p>
        <form className="space-y-4">
          {[
            { label: 'Name', type: 'text', placeholder: 'Your name' },
            { label: 'Email', type: 'email', placeholder: 'you@example.com' },
            { label: 'Message', type: 'textarea', placeholder: 'Your message…' },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-[#ddd] mb-1">{f.label}</label>
              {f.type === 'textarea' ? (
                <textarea
                  rows={4}
                  required
                  placeholder={f.placeholder}
                  className="w-full px-4 py-2 bg-[#111] text-[#ddd] border border-[#c9ad77] rounded-md focus:outline-none focus:ring-2 focus:ring-[#c9ad77]"
                />
              ) : (
                <input
                  type={f.type}
                  required
                  placeholder={f.placeholder}
                  className="w-full px-4 py-2 bg-[#111] text-[#ddd] border border-[#c9ad77] rounded-md focus:outline-none focus:ring-2 focus:ring-[#c9ad77]"
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full px-6 py-2 bg-[#111] text-[#c9ad77] font-semibold rounded-lg transition-shadow hover:shadow-lg hover:shadow-[#c9ad77]/40 hover:bg-[#c9ad77] hover:text-black"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  </section>
);
