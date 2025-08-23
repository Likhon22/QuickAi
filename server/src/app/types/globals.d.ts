declare global {
  namespace Express {
    interface Request {
      free_usage?: number;
      plan?: 'premium' | 'free';
      auth(): Promise<{
        userId: string;
        has: (options: { plan: string }) => Promise<boolean>;
      }>;
    }
  }
}

export {};
