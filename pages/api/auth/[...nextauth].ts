// pages/api/auth/[...nextauth].ts

import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import Adapter from "@next-auth/typeorm-adapter";
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  adapters: Adapter({
    type: "postgres", // or mysql, postgresql, mssql
    database: process.env.DATABASE_URL,
    synchronize: true,
  }),
  secret: process.env.SECRET,
};
