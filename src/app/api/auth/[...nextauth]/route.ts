import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.accessToken = account.access_token;
        token.googleId = profile.sub;
        token.email = profile.email;
      }

      if (account?.provider === "google") {
        try {
          const res = await fetch(`http://127.0.0.1:8080/api/auth/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id_token: "account.id_token",
            }),
          });

          const data = await res.json();
          console.log("DATA: ", data);
          if (!res.ok) {
            token.backendError = data.error;
            token.backendToken = undefined;
            return token;
          }
          token.backendToken = data.token;
          token.id = data.id || data.user_id;
          token.backendError = undefined;
        } catch (err) {
          token.backendError = "FAIL_TO_FETCH";
        }
      }

      return token;
    },

    async session({ token, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          googleId: token.googleId as string,
        },
        backendToken: token.backendToken as string,
        backendError: token.backendError as string,
      };
    },
  },
  pages: {
    error: "/auth/error",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
