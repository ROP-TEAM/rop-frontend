import NextAuth, { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
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
      if (account?.provider == "google") {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              token_id: account.id_token,
            }),
          });
          if (res.ok) {
            const data = await res.json();
            console.log(data);
          }
        } catch (err) {
          console.error(err);
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
      };
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
