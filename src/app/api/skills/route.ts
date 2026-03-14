import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // 核心变革：从 Supabase 读取所有技能数据作为唯一事实来源
        const { data: skills, error } = await supabase
            .from("skills")
            .select("*")
            .order("skill_name", { ascending: true });

        if (error) {
            throw error;
        }

        // 逻辑：兼容前端原有的驼峰命名映射
        const formattedSkills = (skills || []).map(skill => ({
            ...skill,
            gradientFrom: skill.gradient_from,
            gradientTo: skill.gradient_to
        }));

        return NextResponse.json(formattedSkills);
    } catch (error) {
        console.error("[API] Failed to fetch skills from Supabase:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
