import type { Request, Response, NextFunction } from "express";

// =============================================================================
// FANECA BRAVA - WAF & ADVANCED SECURITY SHIELD (RENDER PRODUCTION GRADE)
// Multi-layer defense against Scanners, Injections, Probes, Exploits & DoS
// =============================================================================

// --- 1. IP JAIL & REPUTATION SYSTEM ---
interface JailRecord {
  violations: number;
  jailedUntil: number;
}

const ipJail = new Map<string, JailRecord>();
const VIOLATION_THRESHOLD = 15; // 15 suspicious probes in short window = jail
const JAIL_DURATION_MS = 5 * 60 * 1000; // 5 minute cooldown

// Cleanup expired jail entries every 10 minutes to maintain near-zero memory footprint
setInterval(() => {
  const now = Date.now();
  ipJail.forEach((record, ip) => {
    if (record.jailedUntil <= now && record.violations < VIOLATION_THRESHOLD) {
      ipJail.delete(ip);
    }
  });
}, 10 * 60 * 1000).unref();

function getClientIp(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }
  return req.ip || req.socket.remoteAddress || "unknown";
}

function recordViolation(ip: string): boolean {
  // Exclude local loopback from being jailed
  if (ip === "127.0.0.1" || ip === "::1" || ip === "localhost") {
    return false;
  }
  const now = Date.now();
  const current = ipJail.get(ip) || { violations: 0, jailedUntil: 0 };
  current.violations++;

  if (current.violations >= VIOLATION_THRESHOLD) {
    current.jailedUntil = now + JAIL_DURATION_MS;
    ipJail.set(ip, current);
    console.warn(`[WAF JAIL] IP ${ip} has been jailed until ${new Date(current.jailedUntil).toISOString()} for repeated attack probes.`);
    return true;
  }

  ipJail.set(ip, current);
  return false;
}

// --- 2. SIGNATURES DE ATAQUE E ESCÁNERES MALICIOSOS ---

// Known vulnerability scanners and exploitation tools
const MALICIOUS_USER_AGENTS = [
  /sqlmap/i,
  /nikto/i,
  /nuclei/i,
  /gobuster/i,
  /dirbuster/i,
  /masscan/i,
  /wpscan/i,
  /nmap/i,
  /zgrab/i,
  /censys/i,
  /shodan/i,
  /acunetix/i,
  /netsparker/i,
  /havij/i,
  /pangolin/i,
  /burpsuite/i,
];

// Sensitive paths that legitimate users of Faneca Brava would NEVER request
const FORBIDDEN_PATH_PROBES = [
  /\/\.env/i,
  /\/\.git/i,
  /\/\.aws/i,
  /\/\.ssh/i,
  /\/\.config/i,
  /\/wp-admin/i,
  /\/wp-login/i,
  /\/wp-content/i,
  /\/xmlrpc\.php/i,
  /\/phpmyadmin/i,
  /\/pma/i,
  /\/admin\.php/i,
  /\/cgi-bin/i,
  /\/etc\/passwd/i,
  /\/proc\/self/i,
  /\/actuator/i,
  /\/console\/?$/i,
  /\/\.well-known\/(?!acme-challenge)/i,
  /\.(php|asp|aspx|jsp|cgi|pl|sh|bash|exe|dll|bat|cmd|sql|bak|old|orig|swp|yaml|yml|toml)$/i,
];

// Dangerous script injection patterns (XSS / Remote Code Injection)
const SCRIPT_INJECTION_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /javascript:[^"']*/gi,
  /vbscript:[^"']*/gi,
  /data:text\/html/gi,
  /<iframe\b/gi,
  /<object\b/gi,
  /<embed\b/gi,
  /\bonerror\s*=/gi,
  /\bonload\s*=/gi,
  /\bjavascript\s*:/gi,
  /\bunion\s+select\b/gi,
  /\bexec\s*\(/gi,
];

// --- 3. SANITIZACIÓN RECURSIVA CONTRA PROTOTYPE POLLUTION E XSS ---

function sanitizeValue(value: unknown): unknown {
  if (typeof value === "string") {
    // Strip direct dangerous HTML execution tags
    let clean = value;
    for (const pattern of SCRIPT_INJECTION_PATTERNS) {
      clean = clean.replace(pattern, "");
    }
    return clean;
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }

  if (value !== null && typeof value === "object") {
    const cleanObj: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value)) {
      // Prototype Pollution Shield: Drop dangerous keys immediately
      if (key === "__proto__" || key === "constructor" || key === "prototype") {
        console.warn(`[WAF SHIELD] Blocked prototype pollution key: "${key}"`);
        continue;
      }
      cleanObj[key] = sanitizeValue(val);
    }
    return cleanObj;
  }

  return value;
}

// =============================================================================
// WAF MIDDLEWARE PRINCIPAL
// =============================================================================

export function wafMiddleware(req: Request, res: Response, next: NextFunction): void {
  // Aplicar sempre todas as cabeceiras de seguridade avanzadas para o navegador (CSP, HSTS, COOP, CORP)
  res.setHeader(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https:",
      "media-src 'self' data: blob: https:",
      "connect-src 'self' https://generativelanguage.googleapis.com https://api.elevenlabs.io",
      "frame-ancestors 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ")
  );

  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
  res.setHeader("Permissions-Policy", "camera=(), geolocation=(), payment=(), usb=()");

  // HSTS para forzar HTTPS permanente no navegador (válido en Render)
  if (req.secure || req.headers["x-forwarded-proto"] === "https") {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  }

  const ip = getClientIp(req);
  const now = Date.now();

  // 1. Verificación do cárcere de IPs (Jail Check)
  const jail = ipJail.get(ip);
  if (jail && jail.jailedUntil > now) {
    res.status(403).json({ error: "Access denied by security shield. Try again later." });
    return;
  }

  // 2. Método HTTP estritamente permitido
  const ALLOWED_METHODS = new Set(["GET", "POST", "HEAD", "OPTIONS"]);
  if (!ALLOWED_METHODS.has(req.method)) {
    res.status(405).json({ error: `Method ${req.method} not allowed.` });
    return;
  }

  // 3. Validación de lonxitude de URL (Anti buffer overflow / DoS)
  if (req.originalUrl.length > 2048) {
    recordViolation(ip);
    res.status(414).json({ error: "Request URI too long." });
    return;
  }

  // 4. Detección de escáneres automáticos por User-Agent
  const userAgent = req.headers["user-agent"] || "";
  for (const botPattern of MALICIOUS_USER_AGENTS) {
    if (botPattern.test(userAgent)) {
      console.warn(`[WAF SCANNER] Blocked scanner UA: "${userAgent}" from IP: ${ip}`);
      recordViolation(ip);
      res.status(403).json({ error: "Forbidden: automated vulnerability scanners are blocked." });
      return;
    }
  }

  // 5. Detección de sondas a ficheiros confidenciais (.env, .git, php, etc.)
  const rawUrl = req.originalUrl;
  let decodedPath = rawUrl;
  try {
    decodedPath = decodeURIComponent(rawUrl);
  } catch {
    // Malformed URI encoding is a common fuzzing tactic
    recordViolation(ip);
    res.status(400).json({ error: "Malformed request URI." });
    return;
  }

  // Double-decoding check (bypass evasion)
  if (decodedPath.includes("%25") || decodedPath.includes("%2e") || decodedPath.includes("%2E")) {
    try {
      decodedPath = decodeURIComponent(decodedPath);
    } catch {
      // Ignore
    }
  }

  for (const probePattern of FORBIDDEN_PATH_PROBES) {
    if (probePattern.test(decodedPath)) {
      console.warn(`[WAF PROBE] Blocked unauthorized probe attempt: "${decodedPath}" from IP: ${ip}`);
      recordViolation(ip);
      res.status(403).json({ error: "Forbidden: resource does not exist." });
      return;
    }
  }

  // 6. Sanitización activa do corpo (req.body) e parámetros (req.query)
  if (req.body && typeof req.body === "object") {
    req.body = sanitizeValue(req.body);
  }
  if (req.query && typeof req.query === "object") {
    req.query = sanitizeValue(req.query) as any;
  }

  next();
}

