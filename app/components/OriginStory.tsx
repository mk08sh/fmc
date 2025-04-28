import Image from 'next/image';

export default function OriginStory() {
  return (
    <section id="origin" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[400px] md:h-[600px] border-2 border-black p-4">
            <div className="absolute inset-0 bg-black/5" style={{
              backgroundImage: `url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm5.656 0L19.515 8.485 17.343 10.657l7.9-7.9h2.757zm5.656 0L24.172 8.485 26.343 10.657l7.9-7.9h-.828zm5.656 0L29.828 8.485 32 10.657l7.9-7.9h-2.83zm5.657 0L35.485 8.485 37.657 10.657l7.9-7.9h-2.83zm5.657 0L41.142 8.485 43.314 10.657l7.9-7.9h-2.83zm5.657 0L46.8 8.485 48.97 10.657l7.9-7.9h-2.83zm5.657 0L52.456 8.485 54.627 10.657l7.9-7.9h-2.83zM32 15.716L40.485 7.23l2.172-2.172-7.9 7.9h-5.657zM0 15.716l8.485-8.485 2.172-2.172-7.9 7.9H0z' fill='%23000000' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E\")`,
            }} />
            <div className="relative h-full w-full border border-black/20">
              <Image
                src="/coffee-line-art.svg"
                alt="Coffee roasting process illustration"
                fill
                className="object-contain p-8"
              />
            </div>
          </div>
          
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-black mb-6">
              Origin Story
            </h2>
            <div className="text-lg text-gray-800 space-y-6">
              <p>It all started when I was determined to attend a Y Combinator event despite being rejected. Armed with my coffee equipment in a travel carrier, I presented myself as "Founder Mode Coffee" at the entrance - a name that came to me in the moment.</p>
              <p>Inside, the energy was exhilarating. Conversations with founders and designers sparked something in me that I wanted to experience more of.</p>
              <p>That's when I had the idea: What if I created a Willy Wonka-style coffee experience, roasting custom beans and crafting personalized drinks for founders? The beauty of the process is that it takes 10-15 minutes to roast, grind, and pull a shot - the perfect window for a meaningful conversation about their startup journey.</p>
              <p>Now, I roam the innovation districts with my portable setup, creating customized coffee experiences while connecting with the most fascinating minds in the startup ecosystem - no expectations, just great coffee and even better conversations.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 