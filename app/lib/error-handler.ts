export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true,
    stack = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export const handleError = (err: any) => {
  // Log error for monitoring but don't expose sensitive details
  console.error('Error:', {
    name: err.name,
    message: err.message,
    statusCode: err.statusCode,
    isOperational: err.isOperational,
  });

  // Return safe error response
  return {
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? 'An error occurred' 
      : err.message,
    statusCode: err.statusCode || 500,
  };
}; 