#!/bin/bash

# ============================================================
# UniSkill: The universal skill layer for AI agents.
# Logic: Professional environment initializer with auto-healing
# ============================================================

# Logic: Define colors for international standard output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}UniSkill: The universal skill layer for AI agents.${NC}"
echo "-------------------------------------------------------"

# Logic: Validate the API Key argument
# 逻辑：验证是否传入了 API Key 且格式符合 'us-' 开头
API_KEY=$1
if [ -z "$API_KEY" ] || [[ ! $API_KEY =~ ^us- ]]; then
    echo -e "${RED}Error: Invalid or missing API Key.${NC}"
    echo "Usage: curl -fsSL https://uniskill.ai/setup-skills.sh | bash -s -- <us-your-key>"
    exit 1
fi

# ── Step 1: Online Verification ───────────────────────────
# 逻辑：联机验证 API Key 的真实性，并捕获网络错误码
echo -n "Verifying API Key... "
HTTP_STATUS=$(curl -s -L -w "%{http_code}" -o /dev/null -X POST \
    -H "Content-Type: application/json" \
    -d "{\"key\":\"$API_KEY\"}" \
    https://uniskill.ai/api/v1/verify)
CURL_RET=$?

if [ $CURL_RET -ne 0 ]; then
    echo -e "${RED}NETWORK ERROR (Code: $CURL_RET)${NC}"
    exit 1
elif [ "$HTTP_STATUS" != "200" ]; then
    echo -e "${RED}FAILED (Status: $HTTP_STATUS)${NC}"
    exit 1
fi
echo -e "${GREEN}VALIDATED${NC}"

# ── Step 2: Intelligent Shell Detection ────────────────────
# 逻辑：识别用户主 Shell 配置文件，优先适配 macOS 的 zsh
if [ -f "$HOME/.zshrc" ]; then
    PROFILE="$HOME/.zshrc"
elif [ -f "$HOME/.bashrc" ]; then
    PROFILE="$HOME/.bashrc"
else
    # 逻辑：如果都不存在，则根据当前 SHELL 环境变量创建对应文件
    CURRENT_SHELL=$(basename "$SHELL")
    PROFILE="$HOME/.${CURRENT_SHELL}rc"
    touch "$PROFILE"
fi

# ── Step 3: Idempotent Key Persistence ────────────────────
# 逻辑：防止重复写入。使用兼容 macOS 和 Linux 的 sed 语法更新或追加 Key
if grep -q "UNISKILL_KEY" "$PROFILE" 2>/dev/null; then
    # 逻辑：兼容处理 BSD (macOS) 和 GNU (Linux) 的 sed -i 差异
    sed -i '' "s/export UNISKILL_KEY=.*/export UNISKILL_KEY=\"$API_KEY\"/" "$PROFILE" 2>/dev/null || \
    sed -i "s/export UNISKILL_KEY=.*/export UNISKILL_KEY=\"$API_KEY\"/" "$PROFILE"
else
    echo -e "\n# UniSkill Configuration" >> "$PROFILE"
    echo "export UNISKILL_KEY=\"$API_KEY\"" >> "$PROFILE"
fi

# ── Step 4: Dependency Diagnostic ──────────────────────────
# 逻辑：检查 Python 3 环境，这是运行 AI Agent 的核心依赖
if command -v python3 &>/dev/null; then
    echo -e "${GREEN}✓ Python 3 detected.${NC}"
else
    echo -e "${RED}! Warning: Python 3 not found.${NC}"
fi

# ── Step 5: Finalization ──────────────────────────────────
# 逻辑：展示初始化成功的视觉反馈及后续 source 指令
echo "-------------------------------------------------------"
echo -e "${GREEN}Success! UniSkill environment initialized.${NC}"
echo -e "Profile Updated: ${BLUE}$PROFILE${NC}"
echo -e "Action Required: ${BLUE}source $PROFILE${NC}"
echo -e "Happy hacking! (500 credits ready to use)"
echo "-------------------------------------------------------"
