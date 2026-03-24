let app;
try {
  app = require("../server");
} catch (err) {
  // eslint-disable-next-line global-require
  const express = require("express");
  app = express();
  app.use((_req, res) => {
    res.status(503).json({
      ok: false,
      error: "Server failed to start",
      detail: String(err && err.message ? err.message : err),
      hint:
        "若在 Vercel：请确认已在 Project Settings 配置环境变量；SQLite 在 Serverless 上仅建议临时测试，生产请用 Render 等持久化部署。"
    });
  });
}

module.exports = app;
