# Vercel 静态部署（只托管 dist/）

你的项目前端入口由 `dist/index.html` 引用 `dist/frontend.obf.js`（已在仓库里准备好）。

因此 Vercel 只需要做静态托管，并把 `/api/*` 反代到你的外部后端（下一步单独做）。

## 1. 创建 Vercel 项目
1. 打开 Vercel
2. `Add New` -> `Project` -> 选择你的仓库 `PinkwalletDocs/xiaozhong`
3. 选择框架/预设时，选择 `Other` 或 `Static`（取决于 Vercel 的界面展示）

## 2. 构建与输出目录设置
在 Project Settings -> `Build & Output Settings`：

1. **Build Command（推荐）**
   - `npm run build`
2. **Output Directory**
   - `dist`

说明：
- 这样 Vercel 会运行一次 `scripts/build-dist.js`，生成/更新 `dist/` 混淆产物。
- 你也可以选择不 build（因为仓库已提交 dist），但为了避免 dist 和源代码不一致，这里推荐 build。

## 3. 禁止 Vercel 跑你后端（因为 SQLite 持久化需要外部环境）
你只部署静态资源：
- Vercel 的这个项目不需要启用 Node/Express 运行

后端由外部环境部署（VPS/Render），Vercel 只负责静态 + `/api/*` 反代。

## 4. 下一步：配置 `/api/*` 反代
完成上面后，这一步要做：
- 把浏览器请求 `https://你的vercel域名/api/...` 转发到外部后端

这需要你先有“外部后端地址”（能访问 `/api/health` 的那个域名/端口）。

见：`docs/DEPLOY-VERCEL-REWRITES.md`

