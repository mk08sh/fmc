import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { RateLimiterMemory } from 'rate-limiter-flexible'

const rateLimiter = new RateLimiterMemory({
  points: 100, // Number of points
  duration: 60 * 15, // Per 15 minutes
})

export async function middleware(request: NextRequest) {
  // Only apply to API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    try {
      const ip = request.ip ?? '127.0.0.1'
      await rateLimiter.consume(ip)
    } catch (error) {
      return new NextResponse('Too Many Requests', { status: 429 })
    }
  }

  const response = NextResponse.next()

  // Add security headers
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('X-Download-Options', 'noopen')
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none')

  return response
} 