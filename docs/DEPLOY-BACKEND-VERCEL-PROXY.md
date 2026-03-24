# 后端部署（Express + SQLite）——给 Vercel 反代用

你的目标是：
1. 前端（`dist/`）用 Vercel 静态部署
2. 后端（`node server.js`，写 `data/app.db` 和 `uploads/`）部署到能持久化的地方（VPS/Render）
3. Vercel 只做一件事：把请求 `/api/*` 反代到后端，这样前端里 `fetch('/api/...')` 不用改

下面按“VPS 部署”讲清楚；如果你用 Render，也可以直接套“Environment + Start Command”部分。

## 1. 准备事项（必须）

### 1.1 后端必须能持久化
SQLite 数据在 `data/app.db`，证据文件在 `uploads/`。

因此后端部署环境必须满足：
- 重启/扩容后 `data/` 和 `uploads/` 目录仍然存在

### 1.2 前端回调必须指向 Vercel 域名
后端里的 Twitter OAuth 回调 URL 由环境变量 `BASE_URL` 决定。

你要把：
- `BASE_URL` 设置成你 Vercel 前端的域名（例如 `https://xiaozhong.vercel.app`）
- 不能用 `http://localhost:xxxx`

## 2. 部署步骤（VPS 示例）

假设你已经有一台 Linux VPS（可 SSH 登录）。

### 2.1 拉代码并安装依赖
1. `git clone` 你的仓库到服务器
2. 进入目录
3. 安装依赖：
   - `npm install`

> 说明：仓库里已经带了 `dist/`，通常不需要再手动 build；但如果你怀疑 `dist/` 不存在，可以再跑一次 `npm run build`。

### 2.2 准备环境变量
在服务器上设置 `.env`（或者用系统环境变量注入）。

至少需要这些（根据你 `.env.example`）：
- `TWITTER_CLIENT_ID`
- `TWITTER_CLIENT_SECRET`
- `BASE_URL`（填你的 Vercel 前端域名，如 `https://xiaozhong.vercel.app`）
- `SESSION_SECRET`（任意随机长字符串）
- `JWT_SECRET`（任意随机长字符串）
- `ADMIN_TWITTER_HANDLES`（管理员 Twitter 用户名，不含 `@`，逗号分隔）

如果你要启用链上捐赠验证（当前代码已有捐赠/投票相关接口）：
- `ETH_RPC_URL` / `ARB_RPC_URL` / `BSC_RPC_URL`（可用哪个网络就填哪个）
- `ETH_USDT` / `ARB_USDT` / `BSC_USDT`（如不改合约地址可沿用默认）
- `TREASURY_WALLET`

### 2.3 启动后端
- `npm start` 或 `node server.js`

服务会监听：
- 默认 `PORT=3001`（按需要改）

确保 VPS 的安全组/防火墙放开这个端口（例如 3001）。

## 3. 自测（部署完一定要做）

在浏览器或用 curl 测试：
- `http://<你的后端域名或 IP>:<端口>/api/health`

OAuth 登录/投票相关需要等你 Vercel rewrites（下一步）配置好后再测。

## 4. 关键解释：为什么 BASE_URL 要填 Vercel？

用户在前端点击 `X 登录` 后，会走后端 `/api/auth/twitter` 发起 OAuth。

OAuth 回调 URL 由后端拼出来并交给 X。
X 最终回跳地址需要能访问到“前端域名下的 `/api/auth/twitter/callback`”。

所以 `BASE_URL` 必须是 Vercel 域名，这样 X 回跳到 Vercel 后，Vercel 再把这个 `/api/*` 请求转发给你的后端。

## 5. 下一步（在你完成后端部署后再做）

当你能稳定访问：
- `http(s)://<后端>/api/*`

并且 `/api/health` 正常时，下一步就是在 Vercel 配置：
- Rewrites：`/api/(.*)` -> `https://<后端>/api/$1`

然后验证：
- `/api/auth/twitter/callback`、投票接口、爆料接口、上传证据、讨论评论都能正常跑通。

