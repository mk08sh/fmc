import Button from './components/Button';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Founder Mode Coffee</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        Discover your perfect coffee roast through our personalized quiz experience.
      </p>
      <Button href="/quiz" size="lg">
        Find Your Perfect Roast
      </Button>
    </main>
  );
} 