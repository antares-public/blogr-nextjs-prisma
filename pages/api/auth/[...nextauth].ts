import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { TypeORMLegacyAdapter } from "@next-auth/typeorm-legacy-adapter";
import { ConnectionOptions } from "typeorm";
import * as entities from "../../../lib/entities";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const connection: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  synchronize: true,
  database: "relocator",
};

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
  // adapter: TypeORMLegacyAdapter(connection, { entities }),
  adapter: TypeORMLegacyAdapter(connection),
  secret: process.env.SECRET,
};
