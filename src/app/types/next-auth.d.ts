import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    backendToken: string;
    backendError: string;
    user: {
      id: number;
      googleId: number;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
