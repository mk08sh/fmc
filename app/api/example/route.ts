import { ApiError, handleError } from '@/app/lib/error-handler';

export async function GET(request: Request) {
  try {
    // Your API logic here
    
    return Response.json({ success: true, data: {} });
  } catch (error) {
    const errorResponse = handleError(error);
    return Response.json(errorResponse, { status: errorResponse.statusCode });
  }
} 