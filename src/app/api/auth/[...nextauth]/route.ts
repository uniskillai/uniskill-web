// src/app/api/auth/[...nextauth]/route.ts
// NextAuth.js GitHub OAuth 配置与路由处理

import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
