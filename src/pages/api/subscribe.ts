import type { APIRoute } from 'astro';
import { addSubscriber } from '../../lib/db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const email = data.email?.trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Ugyldig e-mailadresse.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    addSubscriber(email);
    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    if (err?.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return new Response(JSON.stringify({ error: 'Denne e-mail er allerede tilmeldt.' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ error: 'Der opstod en fejl. Prøv igen.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
