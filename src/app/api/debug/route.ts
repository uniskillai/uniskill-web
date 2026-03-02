import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

export async function GET() {
  const vars = {
    GITHUB_ID: process.env.GITHUB_ID ? `✅ SET (${process.env.GITHUB_ID.slice(0, 6)}...)` : "❌ MISSING",
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID ? `✅ SET (${process.env.GITHUB_CLIENT_ID.slice(0, 6)}...)` : "❌ MISSING",
    GITHUB_SECRET: process.env.GITHUB_SECRET ? `✅ SET (${process.env.GITHUB_SECRET.slice(0, 4)}...)` : "❌ MISSING",
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? "❌ MISSING",
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? `✅ SET (${process.env.NEXTAUTH_SECRET.slice(0, 4)}...)` : "❌ MISSING",
  };
  return NextResponse.json(vars);
}
