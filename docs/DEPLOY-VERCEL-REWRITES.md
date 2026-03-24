# Vercel Rewrites：把 `/api/*` 和 `/uploads/*` 转发到外部后端

当后端在 VPS/Render 上部署好，并且你能访问：
- `http(s)://<后端域名>/api/health`

你就可以在 Vercel 配置“同域路由”，让前端仍然用 `fetch('/api/...')`、证据文件仍然用 `/uploads/...`。

## 1. 准备你的后端地址

记录你的后端根地址（不带尾部斜杠）：
- `BACKEND_ROOT = https://<你的后端域名>`（例如 `https://api.example.com`）

它至少需要支持：
- `BACKEND_ROOT/api/health`

## 2. 在 Vercel Dashboard 配置 Rewrites（推荐）

路径：
- 进入 Vercel 项目
- `Settings` -> `Rewrites`（或 `Project Settings` -> `Rewrites`）

添加两条规则：

### 2.1 转发 API
- Source：`/api/(.*)`
- Destination：`BACKEND_ROOT/api/$1`

### 2.2 转发上传证据
前端在提交爆料时会上传证据文件到后端，后端存到 `uploads/`，并返回证据 URL 类似：
- `/uploads/<filename>`

所以也必须转发：
- Source：`/uploads/(.*)`
- Destination：`BACKEND_ROOT/uploads/$1`

## 3. 你需要确认的点（验证用）

配置完后，打开浏览器（最好用无痕）：
1. 访问你的 Vercel 域名首页
2. 点 `X 登录`，确保能完成授权回调
3. 提交一次爆料（包含证据），确认：
   - 前端提交成功
   - 列表里证据图片/视频能正常加载（不为 404）

## 4. 常见问题

### 4.1 登录后一直没登录态
通常是你访问了不同域名：
- 登录发起域名 = Vercel 域名
- 回调也应回到 Vercel 域名
并且 Rewrites 已生效（否则回调落到后端域名，会导致 Cookie/Session 不一致）。

### 4.2 证据图片 404
通常是你只配了 `/api/*`，但没配 `/uploads/*`。

