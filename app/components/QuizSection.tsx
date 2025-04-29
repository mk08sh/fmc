import Button from './Button';

export default function QuizSection() {
  return (
    <section className="py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8">
            Founder in a Cup
          </h2>
          <p className="text-xl text-gray-300 mb-12 font-light">
            We roast fresh, come to your office, and craft your espresso drink onsite. <span className="text-gray-400">[SF ONLY]</span>
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="border border-white/20 backdrop-blur p-8">
              <div className="text-2xl mb-4">🎯</div>
              <h3 className="font-semibold mb-3 text-xl">Custom Roast</h3>
              <p className="text-gray-400">Quick quiz, perfect roast match.</p>
            </div>
            <div className="border border-white/20 backdrop-blur p-8">
              <div className="text-2xl mb-4">⚡️</div>
              <h3 className="font-semibold mb-3 text-xl">Office Brew</h3>
              <p className="text-gray-400">Fresh roast, ground and brewed onsite.</p>
            </div>
            <div className="border border-white/20 backdrop-blur p-8">
              <div className="text-2xl mb-4">🚀</div>
              <h3 className="font-semibold mb-3 text-xl">Founder Fuel</h3>
              <p className="text-gray-400">Your startup story in every sip.</p>
            </div>
          </div>
          
          <Button 
            href="/quiz" 
            size="lg" 
            className="bg-white text-black hover:bg-gray-100 border-2 border-white px-8 py-4 text-lg"
          >
            Founder Roast Quiz
          </Button>
          
          <p className="mt-4 font-bold text-white">
            YC Founders (any batch): Free
          </p>

          {/* Add decorative line art elements */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-10">
            <svg width="200" height="200" viewBox="0 0 200 200" className="rotate-45">
              <circle cx="100" cy="100" r="80" fill="none" stroke="white" strokeWidth="1" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="white" strokeWidth="1" />
              <circle cx="100" cy="100" r="40" fill="none" stroke="white" strokeWidth="1" />
            </svg>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10">
            <svg width="150" height="150" viewBox="0 0 150 150">
              <rect x="25" y="25" width="100" height="100" fill="none" stroke="white" strokeWidth="1" />
              <rect x="45" y="45" width="60" height="60" fill="none" stroke="white" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
} 