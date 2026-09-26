// 生成组织主页横幅 assets/banner.svg 与 assets/social-preview.svg
// Logo 直接嵌入站点在用的白色 PNG（assets/src/），保证与线上完全一致
// 用法: node gen-banners.mjs  然后用 sharp 转出同名 PNG
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const img = (p) =>
  'data:image/png;base64,' + readFileSync(join(__dirname, 'assets', 'src', p)).toString('base64');

const mark = img('logo-mark-white.png');       // 256x134 速度云 + Z
const wordmark = img('logo-wordmark-white.png'); // 1280x220 ZeroDelay 字标

const cornerBrackets = (pad, len, sw) => `
  <g stroke="#22d3ee" stroke-width="${sw}" fill="none" opacity="0.45">
    <path d="M ${pad} ${pad + 32} L ${pad} ${pad} L ${pad + 32} ${pad}"/>
    <path d="M ${1600 - pad - 32} ${pad} L ${1600 - pad} ${pad} L ${1600 - pad} ${pad + 32}"/>
    <path d="M ${1600 - pad} ${420 - pad - 32} L ${1600 - pad} ${420 - pad} L ${1600 - pad - 32} ${420 - pad}"/>
    <path d="M ${pad + 32} ${420 - pad} L ${pad} ${420 - pad} L ${pad} ${420 - pad - 32}"/>
  </g>`;

const banner = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1600 420" width="1600" height="420" role="img" aria-label="ZeroDelay - FiveM / RedM 资源与中文教程社区">
  <defs>
    <linearGradient id="zd-grad-line" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#22d3ee" stop-opacity="0"/>
      <stop offset="0.5" stop-color="#22d3ee"/>
      <stop offset="1" stop-color="#22d3ee" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="420" fill="#0b0d12"/>
  <rect x="0.5" y="0.5" width="1599" height="419" fill="none" stroke="#1f2937" stroke-width="1"/>
  <circle cx="1480" cy="52" r="300" fill="none" stroke="#22d3ee" stroke-width="52" opacity="0.05"/>
  <circle cx="84" cy="404" r="170" fill="none" stroke="#22d3ee" stroke-width="36" opacity="0.04"/>${cornerBrackets(40, 32, 3)}
  <image href="${mark}" xlink:href="${mark}" x="428" y="100" width="183" height="96"/>
  <image href="${wordmark}" xlink:href="${wordmark}" x="647" y="103" width="524" height="90"/>
  <text x="800" y="260" text-anchor="middle" font-family="'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif" font-size="24" fill="#9ca3af" letter-spacing="2">开服不绕路，下载零等待</text>
  <rect x="660" y="292" width="280" height="1" fill="url(#zd-grad-line)"/>
  <text x="800" y="332" text-anchor="middle" font-family="'Cascadia Code', Consolas, 'JetBrains Mono', monospace" font-size="19" fill="#22d3ee" letter-spacing="1">[ FIVEM / REDM 资源与中文教程社区 ]</text>
</svg>`;

const social = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1280 640" width="1280" height="640" role="img" aria-label="ZeroDelay">
  <defs>
    <linearGradient id="zd-grad-line" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#22d3ee" stop-opacity="0"/>
      <stop offset="0.5" stop-color="#22d3ee"/>
      <stop offset="1" stop-color="#22d3ee" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1280" height="640" fill="#0b0d12"/>
  <circle cx="1180" cy="80" r="260" fill="none" stroke="#22d3ee" stroke-width="48" opacity="0.05"/>
  <circle cx="60" cy="620" r="150" fill="none" stroke="#22d3ee" stroke-width="32" opacity="0.04"/>
  <g stroke="#22d3ee" stroke-width="4" fill="none" opacity="0.45">
    <path d="M 56 108 L 56 56 L 108 56"/>
    <path d="M 1172 56 L 1224 56 L 1224 108"/>
    <path d="M 1224 532 L 1224 584 L 1172 584"/>
    <path d="M 108 584 L 56 584 L 56 532"/>
  </g>
  <image href="${mark}" xlink:href="${mark}" x="186" y="170" width="229" height="120"/>
  <image href="${wordmark}" xlink:href="${wordmark}" x="455" y="175" width="640" height="110"/>
  <text x="640" y="350" text-anchor="middle" font-family="'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif" font-size="30" fill="#9ca3af" letter-spacing="4">开服不绕路，下载零等待</text>
  <rect x="500" y="396" width="280" height="2" fill="url(#zd-grad-line)"/>
  <text x="640" y="448" text-anchor="middle" font-family="'Cascadia Code', Consolas, 'JetBrains Mono', monospace" font-size="26" fill="#22d3ee" letter-spacing="1">[ FIVEM / REDM 资源与中文教程社区 ]</text>
</svg>`;

writeFileSync(join(__dirname, 'assets', 'banner.svg'), banner);
writeFileSync(join(__dirname, 'assets', 'social-preview.svg'), social);
console.log('banner.svg / social-preview.svg generated');
