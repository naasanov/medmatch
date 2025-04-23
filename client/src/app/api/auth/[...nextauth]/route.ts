import { login } from "@/services/authService";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        if (!email || !password) {
          return null;
        }
        const user = await login(email, password);
        if (!user) {
          return null;
        }

        const result = {
          id: user.id,
          first: user.first,
          last: user.last,
          email: user.email,
          profile: user.profile,
          isEmployer: user.isEmployer,
        }
        return result;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  // Expose the JWT access token
  callbacks: {
    async jwt({ token, account, user }) {
      // If credentials were used
      if (user) {
        token.accessToken = user.accessToken;
      }
      // If OAuth was used
      else if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
