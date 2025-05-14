import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import axios from "axios";
import { isJwtExpired } from "./utils/jwt";
import { refreshToken } from "./utils/auth-utils";
import { makeUrl } from "./utils/url";

const options = {
  providers: [
    Google,
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.SESSION_SECRET,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
    
        const { access_token, id_token } = account;

        try {
         
          const response = await axios.post(
            makeUrl(
              process.env.NEXT_PUBLIC_BACKEND_API_BASE+'/api',
              "social",
              "login",
              "google"
            ),
            {
              access_token,
            }
          );

          user.accessToken = response.data.key;
        
          return true;
        } catch (error) {
          console.log("error", error);
          console.log(JSON.stringify(error));
          return false;
        }
      }
      return false;
    },

    async jwt({ token = {}, user }) {
      // Initial sign in

      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.iat = Math.floor(Date.now() / 1000);
        token.exp = Math.floor(Date.now() / 1000 + 2 * 60 * 60);
        return token;
      }

      // Check if token is expired and needs refreshing
      if (token.accessToken && isJwtExpired(token.accessToken)) {
        try {
          const [newAccessToken, newRefreshToken] = await refreshToken(
            token.refreshToken
          );

          if (newAccessToken && newRefreshToken) {
            token.accessToken = newAccessToken;
            token.refreshToken = newRefreshToken;
            token.iat = Math.floor(Date.now() / 1000);
            token.exp = Math.floor(Date.now() / 1000 + 2 * 60 * 60);
            return token;
          }
        } catch (error) {
          console.log("Error refreshing token:", error);
        }

        // Unable to refresh tokens, invalidate the session
        return {
          ...token,
          exp: 0,
        };
      }

      // Token is still valid
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth(options);
