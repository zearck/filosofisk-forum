import type { APIRoute } from 'astro';
import { isAuthenticated } from '../../../lib/auth';
import { getSubscribers, deleteSubscriber } from '../../../lib/db';

export const prerender = false;

export const GET: APIRoute = async ({ request, url }) => {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ error: 'Ikke autoriseret.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const filter = url.searchParams.get('filter') as 'all' | 'members' | 'non-members' | null;
  const subscribers = getSubscribers(filter || undefined);

  return new Response(JSON.stringify({ subscribers }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const DELETE: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ error: 'Ikke autoriseret.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const data = await request.json();
    const id = Number(data.id);
    if (!id) {
      return new Response(JSON.stringify({ error: 'Manglende id.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    deleteSubscriber(id);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Der opstod en fejl.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
