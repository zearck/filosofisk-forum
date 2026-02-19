const COOKIE_NAME = 'admin_session';

export function isAuthenticated(request: Request): boolean {
  const cookie = request.headers.get('cookie') || '';
  const token = parseCookie(cookie, COOKIE_NAME);
  const password = import.meta.env.ADMIN_PASSWORD;
  if (!password) return false;
  return token === hashPassword(password);
}

export function createSessionCookie(password: string): string {
  const token = hashPassword(password);
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`;
}

export function clearSessionCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`;
}

export function checkPassword(input: string): boolean {
  const password = import.meta.env.ADMIN_PASSWORD;
  if (!password) return false;
  return input === password;
}

function parseCookie(cookieHeader: string, name: string): string | null {
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function hashPassword(password: string): string {
  // Simple hash for session token — not cryptographic security,
  // but sufficient for a single-password admin cookie.
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return 'session_' + Math.abs(hash).toString(36);
}
