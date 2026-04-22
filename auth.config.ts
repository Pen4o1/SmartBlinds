import type { NextAuthConfig } from "next-auth"

const authConfig = {
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isProtectedRoute =
        nextUrl.pathname.startsWith("/dashboard") || nextUrl.pathname.startsWith("/api/devices")

      if (!isProtectedRoute) {
        return true
      }

      return Boolean(auth?.user)
    },
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
    jwt({ token, user }) {
      if (user?.id) {
        token.sub = user.id
      }
      return token
    },
  },
  providers: [],
} satisfies NextAuthConfig

export default authConfig
