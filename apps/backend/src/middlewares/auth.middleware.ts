import { Request, Response, NextFunction } from "express";

// Simple middleware to extract user ID from token
// In a real world application, this would validate JWT tokens
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // For this demo, we're using a simple token format: token-{userId}
    const token = authHeader.split(" ")[1];
    if (token && token.startsWith("token-")) {
      const userId = parseInt(token.split("-")[1]);
      (req as any).userId = userId;
    }
  }

  next();
};
