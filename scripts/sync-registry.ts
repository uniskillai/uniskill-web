// uniskill-web/scripts/sync-registry.ts
// Logic: Unified Registry Sync - Push .md skills to both Cloudflare KV and Supabase DB.
// This implements the "Upload Time = Registration" logic.

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import yaml from "js-yaml";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { execSync } from "child_process";

// 1. Load environment variables
const SCRIPT_DIR = __dirname;
dotenv.config({ path: path.join(SCRIPT_DIR, "..", ".env.local") });

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const NAMESPACE_ID = process.env.CLOUDFLARE_KV_NAMESPACE_ID;

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const SKILLS_DIR = path.join(SCRIPT_DIR, "..", "registry", "skills");
const SYSTEM_UID = "00000000-0000-0000-0000-000000000001";

// 2. Initialize Supabase Client
const supabase = createClient(SUPABASE_URL!, SUPABASE_KEY!);

async function putToKV(key: string, value: string) {
    try {
        const tmpFile = path.join("/tmp", `kv_${key.replace(/:/g, "_")}.json`);
        fs.writeFileSync(tmpFile, value);
        
        execSync(`npx wrangler kv key put --namespace-id ${NAMESPACE_ID} "${key}" --path "${tmpFile}"`, {
            stdio: "inherit"
        });
        
        fs.unlinkSync(tmpFile);
    } catch (err: any) {
        console.error(`❌ Ranger KV Put failed for [${key}]:`, err.message);
    }
}

async function syncRegistry() {
    console.log("🚀 Starting Unified Registry Sync (KV + Supabase)...\n");

    if (!ACCOUNT_ID || !NAMESPACE_ID) {
        console.error("❌ Error: Missing Cloudflare credentials (ACCOUNT_ID/NAMESPACE_ID).");
        process.exit(1);
    }

    if (!SUPABASE_URL || !SUPABASE_KEY) {
        console.error("❌ Error: Missing Supabase credentials.");
        process.exit(1);
    }

    if (!fs.existsSync(SKILLS_DIR)) {
        console.error(`❌ Error: Registry directory not found at ${SKILLS_DIR}`);
        process.exit(1);
    }

    const files = fs.readdirSync(SKILLS_DIR).filter(file => file.endsWith(".md"));
    console.log(`📦 Found ${files.length} skill files to sync.\n`);

    for (const file of files) {
        const filePath = path.join(SKILLS_DIR, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");

        try {
            // A. Parse MD and Frontmatter (2.0 Standard)
            const { data: frontmatter, content } = matter(fileContent);
            const skill_name = frontmatter.skill_name || frontmatter.id; // Compatibility

            if (!skill_name) throw new Error("Missing 'skill_name' in frontmatter");

            const display_name = frontmatter.display_name || frontmatter.name || skill_name;
            const cost_per_call = frontmatter.cost_per_call !== undefined ? frontmatter.cost_per_call : (frontmatter.costPerCall || 0);
            const tags = frontmatter.tags || [];
            const category = frontmatter.category || "utilities";
            const status = (frontmatter.status || "Official").toLowerCase();

            // Extract Description
            const descMatch = content.match(/## Description\s+([\s\S]*?)(?=\n##|$)/i);
            const description = descMatch ? descMatch[1].trim() : "";

            // Extract Parameters
            const paramMatch = content.match(/## Parameters\s+```json\s+([\s\S]*?)```/i);
            const parameters = paramMatch ? JSON.parse(paramMatch[1]) : { type: "object", properties: {} };

            // Extract Implementation
            const implMatch = content.match(/## Implementation YAML\s+```yaml\s+([\s\S]*?)```/i);
            if (!implMatch) throw new Error("Missing '## Implementation YAML' block");
            const implementationJson = yaml.load(implMatch[1]);

            console.log(`🔍 Processing: ${skill_name} (${display_name})`);

            // B. Sync to Cloudflare KV (For Gateway Runtime)
            const unifiedSkill = {
                skill_name,
                source: status,
                meta: {
                    display_name,
                    emoji: frontmatter.emoji || "🧩",
                    cost: cost_per_call,
                    category: category,
                    tags: tags,
                    parameters: parameters
                },
                // Flattening for direct access
                display_name,
                cost_per_call,
                config: implementationJson,
                docs: {
                    short: description,
                    full_md: fileContent
                }
            };

            let gatewayKey = `skill:official:${skill_name}`;
            if (status === "market") gatewayKey = `skill:market:${skill_name}`;

            console.log(`📡 [KV] Syncing ${gatewayKey}...`);
            await putToKV(gatewayKey, JSON.stringify(unifiedSkill));

            // C. Sync to Supabase (For Discovery & Billing)
            console.log(`🗄️ [DB] Upserting ${skill_name} to skills table...`);
            const { error: dbError } = await supabase
                .from("skills")
                .upsert({
                    skill_name: skill_name,
                    display_name: display_name,
                    tags: tags,
                    cost_per_call: cost_per_call,
                    category: status === "official" ? "official" : "community",
                    creator_uid: SYSTEM_UID
                }, {
                    onConflict: "skill_name"
                });

            if (dbError) {
                console.error(`❌ [DB] Error upserting ${skill_name}:`, dbError.message);
            } else {
                console.log(`✅ [DB] Success: ${skill_name}`);
            }

        } catch (error: any) {
            console.error(`❌ Failed to sync [${file}]:`, error.message);
        }
    }

    console.log("\n🎉 Unified Sync Complete!");
}

syncRegistry().catch(err => {
    console.error("❌ Fatal Error:", err);
    process.exit(1);
});
