/**
 * Vercel / Fluid Compute：根入口导出 Express app（见 https://vercel.com/docs/frameworks/backend/express ）
 * 本地仍用 `node server.js`（server.js 内 require.main === module 时 listen）
 */
module.exports = require("./server.js");
