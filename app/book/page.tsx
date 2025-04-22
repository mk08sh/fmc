'use client';

import { useState } from 'react';
import Button from '../components/Button';

interface BookingFormData {
  name: string;
  email: string;
  address: string;
  date: string;
  time: string;
  specialRequests: string;
}

export default function BookingPage() {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    address: '',
    date: '',
    time: '',
    specialRequests: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    setIsSubmitted(true);
  };
  
  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Booking Confirmed!
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Thank you for booking your Founder Mode Coffee pop-up experience.
            We'll be in touch shortly with confirmation details.
          </p>
          <div className="mt-8">
            <Button href="/" variant="secondary">
              Return Home
            </Button>
          </div>
        </div>
      </main>
    );
  }
  
  return (
    <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Book Your Pop-Up Experience
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Let us bring the perfect roast to your workspace
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-12 space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Office Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Preferred Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700"
              >
                Preferred Time
              </label>
              <input
                type="time"
                name="time"
                id="time"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                value={formData.time}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div>
            <label
              htmlFor="specialRequests"
              className="block text-sm font-medium text-gray-700"
            >
              Special Requests
            </label>
            <textarea
              name="specialRequests"
              id="specialRequests"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              value={formData.specialRequests}
              onChange={handleChange}
            />
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button type="button" href="/" variant="secondary">
              Cancel
            </Button>
            <Button type="submit">
              Book Pop-Up
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
} 