const fs = require("fs");
const path = require("path");
const javascriptObfuscator = require("javascript-obfuscator");

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function copyFile(src, dest) {
  fs.copyFileSync(src, dest);
}

function build() {
  const rootDir = path.join(__dirname, "..");
  const distDir = path.join(rootDir, "dist");

  ensureDir(distDir);

  const indexSrc = path.join(rootDir, "index.html");
  const adminSrc = path.join(rootDir, "admin.html");
  const stylesSrc = path.join(rootDir, "styles.css");
  const frontendSrc = path.join(rootDir, "frontend.js");

  const indexHtml = fs.readFileSync(indexSrc, "utf8");
  const builtIndexHtml = indexHtml.replace('src="./frontend.js"', 'src="./frontend.obf.js"');

  fs.writeFileSync(path.join(distDir, "index.html"), builtIndexHtml, "utf8");
  copyFile(adminSrc, path.join(distDir, "admin.html"));
  copyFile(stylesSrc, path.join(distDir, "styles.css"));

  const frontendCode = fs.readFileSync(frontendSrc, "utf8");
  const result = javascriptObfuscator.obfuscate(frontendCode, {
    compact: true,
    controlFlowFlattening: false,
    deadCodeInjection: false,
    debugProtection: false,
    disableConsoleOutput: true,
    selfDefending: false,
    simplify: true,
    stringArray: true,
    stringArrayEncoding: ["base64"],
    stringArrayThreshold: 0.75,
    transformObjectKeys: false
  });

  fs.writeFileSync(path.join(distDir, "frontend.obf.js"), result.getObfuscatedCode(), "utf8");
}

build();

