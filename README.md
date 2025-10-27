# AgentLens｜链上运营分析仪表盘

MVP 目标：输入 EVM 项目合约 / 协议地址 → 输出新增、活跃、留存、交易量、资金流向等核心图表，并支持一键导出日报。

> 当前仓库提供了 Next.js + React 的基础脚手架、ECharts 图表组件、Zustand 状态管理和数据服务层的占位实现，便于后续快速接入 Etherscan / DefiLlama / Flipside 等数据源。

## 本地开发

1. 安装依赖（首次运行）：

   ```bash
   pnpm install
   # or npm install / yarn install
   ```

2. 启动开发服务器：

   ```bash
   pnpm dev
   ```

3. 环境变量：

   - 新建 `.env.local`，配置 API Key：

     ```plaintext
     NEXT_PUBLIC_ETHERSCAN_KEY=your_etherscan_key
     ```

   - 如需接入 Base 链，可额外配置 `BASESCAN_KEY`。

4. 真实数据接入：

   - `services/etherscan.ts`：补充 `fetchAddressActivitySeries` / `fetchAddressVolumeSeries`，聚合日活、交易量等指标；
   - `services/defillama.ts`：根据协议 slug 获取 TVL；
   - `services/dashboard.ts`：替换当前的 mock 数据聚合逻辑；
   - `services/report.ts`：按需补充 Markdown / CSV 格式的日报导出细节。

## 推送到 GitHub

1. 初始化 Git 仓库（如果尚未执行）：

   ```bash
   git init
   git add .
   git commit -m "chore: bootstrap AgentLens dashboard"
   ```

2. 登录 GitHub，新建仓库（例如 `AgentLens-dashboard`），复制远程地址。

3. 关联远程并推送：

   ```bash
   git remote add origin git@github.com:<your-name>/AgentLens-dashboard.git
   git branch -M main
   git push -u origin main
   ```

   > 如无 SSH Key，可使用 HTTPS 地址推送，或先通过 `gh auth login` 绑定 GitHub CLI。

## Vercel / Netlify 部署

1. **Vercel（推荐）**
   - 登录 [Vercel](https://vercel.com/)，`New Project` → `Import Git Repository`；
   - 选择刚推送的 GitHub 仓库，框架选择 `Next.js`；
   - 在 `Environment Variables` 添加 `NEXT_PUBLIC_ETHERSCAN_KEY`；
   - 点击 Deploy，Vercel 会自动构建并托管，生成公共访问链接；
   - 后续推送到 `main` 会自动触发增量部署。

2. **Netlify**
   - `Import from Git` → 选择 GitHub 仓库；
   - Build command：`npm run build`，Publish directory：`.next`;
   - 在 Build settings → Environment 添加同样的 API Key；
   - 如需 SSR/Edge 功能，可开启 Netlify Next.js Adapter。

## 后续迭代建议

- 扩展链：抽象 `ChainKey` 类型 + Endpoint 列表，新增 Polygon / Arbitrum；
- 数据缓存：在 `services/dashboard.ts` 内接入 Upstash Redis / Supabase edge functions 做 5~10 分钟缓存；
- 报表自动化：结合 GitHub Actions 定时触发无头浏览器导出日报，推送到 Slack / 钉钉；
- 用户管理：使用 Supabase Auth + Row Level Security 管理项目成员与访问权限。
