#!/bin/bash
# =================================================================
# UniSkill MCP Connector Setup Script
# Logic: Inject UniSkill MCP Server configuration into local Agent
# =================================================================

API_KEY=$1

if [ -z "$API_KEY" ]; then
  echo "❌ Error: API Key is required."
  echo "Usage: curl -fsSL https://uniskill.ai/connect.sh | bash -s -- <YOUR_KEY>"
  exit 1
fi

echo "🚀 Configuring UniSkill MCP Server..."

# 逻辑：假设 OpenClaw 或各类 Agent 使用 .env 文件来配置外部 MCP 服务器
ENV_FILE=".env"

# 逻辑：如果没有 .env 文件，则创建一个
if [ ! -f "$ENV_FILE" ]; then
    touch "$ENV_FILE"
fi

# 逻辑：极其优雅地注入或更新环境变量
# 指向我们在 Cloudflare 部署的极其专业的 V1 路由
sed -i.bak '/UNISKILL_MCP_URL/d' $ENV_FILE
sed -i.bak '/UNISKILL_API_KEY/d' $ENV_FILE
echo "UNISKILL_MCP_URL=\"https://api.uniskill.ai/v1/mcp\"" >> $ENV_FILE
echo "UNISKILL_API_KEY=\"$API_KEY\"" >> $ENV_FILE

rm -f ${ENV_FILE}.bak

echo "✅ Success! UniSkill is now wired to your Agent."
echo "🧠 Your Agent will now dynamically discover tools on startup!"
