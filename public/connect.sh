#!/bin/bash
# Logic: Enhanced UX/DX for UniSkill MCP injection

API_KEY=$1

# 逻辑：定义极客终端颜色
GREEN='\033[0;32m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

if [ -z "$API_KEY" ]; then
  echo -e "${YELLOW}❌ Error: API Key is required.${NC}"
  echo "Usage: curl -fsSL https://uniskill.ai/connect.sh | bash -s -- <YOUR_KEY>"
  exit 1
fi

ENV_FILE=".env"
# 逻辑：获取当前绝对路径，给用户最大的确定感
CURRENT_DIR=$(pwd)

# 逻辑：生成打码的 API Key 用于展示 (例如 us-66fd...546d)
MASKED_KEY="${API_KEY:0:7}...${API_KEY: -4}"

echo -e ""
echo -e "${CYAN}======================================================${NC}"
echo -e "${CYAN}       ⚡️ UniSkill MCP Connector Initializing...      ${NC}"
echo -e "${CYAN}======================================================${NC}"
echo -e ""

echo -e "🔍 Scanning environment in ${BLUE}${CURRENT_DIR}${NC}..."
sleep 0.5 # 模拟扫描的极客停顿感

if [ ! -f "$ENV_FILE" ]; then
    touch "$ENV_FILE"
    echo -e "📄 Created new ${ENV_FILE} file."
fi

echo -e "⚙️  Injecting Cloud MCP settings..."
sleep 0.5

# 逻辑：极其优雅地注入或更新环境变量
sed -i.bak '/UNISKILL_MCP_URL/d' $ENV_FILE
sed -i.bak '/UNISKILL_API_KEY/d' $ENV_FILE
echo "UNISKILL_MCP_URL=\"https://api.uniskill.ai/v1/mcp\"" >> $ENV_FILE
echo "UNISKILL_API_KEY=\"$API_KEY\"" >> $ENV_FILE
rm -f ${ENV_FILE}.bak

echo -e ""
echo -e "${GREEN}[✔] Successfully updated: ${CURRENT_DIR}/${ENV_FILE}${NC}"
echo -e "    ${BLUE}+ UNISKILL_MCP_URL=\"https://api.uniskill.ai/v1/mcp\"${NC}"
echo -e "    ${BLUE}+ UNISKILL_API_KEY=\"${MASKED_KEY}\"${NC}"
echo -e ""
echo -e "${GREEN}✅ Success! UniSkill Superbrain is now wired to your Agent.${NC}"
echo -e ""
echo -e "${YELLOW}🚀 NEXT STEPS:${NC}"
echo -e "1. Start your Agent framework (e.g., OpenClaw)."
echo -e "2. Copy & Paste this prompt to test dynamic tools:"
echo -e "   ${CYAN}> \"What is the real-time weather in London?\"${NC}"
echo -e ""
echo -e "Dashboard: ${BLUE}https://uniskill.ai/dashboard${NC}"
echo -e "${CYAN}======================================================${NC}"
echo -e ""
