import type { APIRoute } from 'astro';
import { checkPassword, createSessionCookie } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const password = data.password;

    if (!password || !checkPassword(password)) {
      return new Response(JSON.stringify({ error: 'Forkert adgangskode.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': createSessionCookie(password),
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Der opstod en fejl.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
