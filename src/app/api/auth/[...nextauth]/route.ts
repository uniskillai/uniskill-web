// src/app/api/auth/[...nextauth]/route.ts
// NextAuth.js GitHub OAuth 配置与路由处理

import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const dynamic = "force-dynamic";

export const handler = NextAuth(authOptions);

/* ─── 导出 GET/POST handler 供 App Router 使用 ─── */
export { handler as GET, handler as POST };
