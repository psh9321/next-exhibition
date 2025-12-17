import { DefaultSession } from "next-auth";

declare module "next-auth" {
    export interface Session {
    user: {
      id: number;
    } & DefaultSession["user"];
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  export interface JWT {
    id: number;
    accessToken: string;
  }
}