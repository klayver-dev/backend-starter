import 'dotenv/config';

export const databaseUrl = process.env.DATABASE_URL!;

export const jwtSecret = process.env.JWT_SECRET!;

export const resendApiKey = process.env.RESEND_API_KEY!;

export const frontendUrl = process.env.FRONTEND_URL!;
