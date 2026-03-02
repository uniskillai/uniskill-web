// src/app/api/webhook/sync-credits/route.ts
// Secure webhook to sync credits from Cloudflare to Supabase
// 安全 Webhook：将 Cloudflare 的积分同步至 Supabase

import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // Use Service Role to bypass RLS 使用 Service Role 绕过权限限制
);

export async function POST(req: Request) {
    const authHeader = req.headers.get("Authorization");

    // 1. Verify Admin Secret 验证管理员密钥
    if (authHeader !== `Bearer ${process.env.ADMIN_KEY}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { hash, newBalance } = await req.json();

        // 2. Update Supabase credits directly 更新 Supabase 中的积分余额
        const { error } = await supabase
            .from('profiles')
            .update({ credits: newBalance })
            .eq('token_hash', hash);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: "Sync failed" }, { status: 500 });
    }
}
