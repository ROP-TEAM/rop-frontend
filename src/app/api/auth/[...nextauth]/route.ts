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
        token.googleId = profile.sub;
        token.email = profile.email;

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`,
            {
              method: "POST",

              headers: {
                "Content-Type": "application/json",
              },

              body: JSON.stringify({
                id_token: account.id_token,
              }),
            },
          );

          const data = await res.json();


          if (!res.ok) {
            token.backendError = data.error;
            return token;
          }

          token.backendToken = data.token;
          token.needOnboarding = data.needOnboarding;
        } catch (err) {
          console.log(err);
          token.backendError = "LOGIN_FAILED";
        }
      }

      return token;
    },

    async session({ session, token }) {
      return {
        ...session,

        backendToken: token.backendToken as string,
        backendError: token.backendError as string,
        needOnboarding: token.needOnboarding as boolean,

        user: {
          ...session.user,
          id: token.googleId as string,
        },
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };