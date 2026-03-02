// src/lib/supabase.ts
// Supabase client initialization for uniskill-web
// uniskill-web 的 Supabase 客户端初始化

import { createClient } from '@supabase/supabase-js';

// 从环境变量读取 Supabase 项目 URL 和匿名公钥
// 这两个变量需在 .env.local（本地）和 Vercel 环境变量（生产）中配置
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Initialize the Supabase client
// 初始化 Supabase 客户端，导出供全局使用
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
