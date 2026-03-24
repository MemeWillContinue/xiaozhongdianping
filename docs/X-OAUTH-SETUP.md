# X（Twitter）OAuth 2.0 登录配置说明

本项目使用 **OAuth 2.0 + PKCE（授权码换 token）**，回调由 `server.js` 处理。

## 1. 在 X Developer 创建应用

1. 打开 [X Developer Portal](https://developer.x.com/) 并登录。
2. 进入 **Developer Portal** → **Projects & Apps** → 创建或选择一个 **Project** / **App**。
3. 在 App 设置里启用 **OAuth 2.0**（若可选，可同时保留 OAuth 1.0a，本项目只用 2.0）。

## 2. App 类型与密钥

- 请选择 **Web App / 网站应用**（会拿到 **Client Secret**，服务端用 Basic Auth 换 token）。
- 在 **Keys and tokens** 中记录：
  - **Client ID**
  - **Client Secret**（勿提交到 Git，只放在 `.env`）

## 3. 回调地址（必须与代码完全一致）

本项目的回调 URL 为：

```text
{BASE_URL}/api/auth/twitter/callback
```

**本地开发示例**（默认端口 3001）：

```text
http://localhost:3001/api/auth/twitter/callback
```

在 X 控制台 **User authentication settings** 里，把上面这一行填进 **Callback URI / Redirect URL**。  
X 要求 **逐字一致**（`http`/`https`、`localhost` vs `127.0.0.1`、端口、路径都不能错）。

## 4. 权限（Scopes）

代码里请求的 scope 为：

`tweet.read users.read offline.access`

在 X 控制台为应用勾选对应权限（或等价能力），否则授权页或换 token 会失败。

## 5. 填写 `.env`

复制 `.env.example` 为 `.env`（若还没有），并设置：

```env
TWITTER_CLIENT_ID=你的Client_ID
TWITTER_CLIENT_SECRET=你的Client_Secret
BASE_URL=http://localhost:3001
SESSION_SECRET=随机长字符串
JWT_SECRET=随机长字符串
```

说明：

| 变量 | 作用 |
|------|------|
| `TWITTER_CLIENT_ID` | OAuth 2.0 Client ID |
| `TWITTER_CLIENT_SECRET` | OAuth 2.0 Client Secret |
| `BASE_URL` | 站点根地址，**不要**末尾 `/`；必须与控制台里回调的前缀一致 |
| `SESSION_SECRET` | `express-session` 签名，用于保存登录态 |
| `JWT_SECRET` | 管理后台 JWT 用；未设 `SESSION_SECRET` 时会回退用它 |

## 6. 上线（HTTPS）

把站点部署到公网后：

1. `BASE_URL` 改为 `https://你的域名`（无尾部斜杠）。
2. 在 X 控制台 **再添加** 一条回调：  
   `https://你的域名/api/auth/twitter/callback`
3. 重启：`node server.js`

## 7. 自测流程

1. 浏览器打开：`http://localhost:3001`（不要用错误端口或仅打开本地 HTML 文件）。
2. 点击 **X 登录**，应跳转到 X 授权页。
3. 授权后应回到站点并显示已登录；`GET /api/auth/me` 应返回 `loggedIn: true`。

## 8. 常见问题

| 现象 | 可能原因 |
|------|----------|
| 点击登录返回 503 | 未配置 `TWITTER_CLIENT_ID` / `TWITTER_CLIENT_SECRET` |
| 授权后静默回到首页、未登录 | 回调 URL 与 `BASE_URL` 不一致；或 `state`/session 丢失（请始终从同一域名访问） |
| 换 token 失败 | Client Secret 错误；或 App 类型不是可保密客户端 |
| 本地 OK、线上失败 | 线上未添加 `https://域名/api/auth/twitter/callback`；或 `BASE_URL` 仍为 localhost |

## 9. 相关代码路径

- 发起授权：`GET /api/auth/twitter`
- 回调：`GET /api/auth/twitter/callback`
- 当前用户：`GET /api/auth/me`
- 登出：`POST /api/auth/logout`
