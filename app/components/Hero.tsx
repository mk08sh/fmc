import Image from 'next/image';
import Button from './Button';

export default function Hero() {
  return (
    <div className="relative min-h-[90vh] flex items-center bg-black">
      <div className="absolute inset-0 z-0 opacity-10">
        {/* Add subtle star pattern background */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight tracking-tighter">
            Founder Mode Coffee
          </h1>
          <p className="text-2xl md:text-3xl mb-12 text-gray-300 font-light">
            We do experiences that don't scale
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              href="/quiz" 
              size="lg" 
              className="px-8 py-4 text-lg"
            >
              Find Your Founder Roast
            </Button>
            <Button 
              href="#origin" 
              variant="outline" 
              size="lg" 
              className="text-white px-8 py-4 text-lg"
            >
              Our Story
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 