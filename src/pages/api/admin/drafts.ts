import type { APIRoute } from 'astro';
import { isAuthenticated } from '../../../lib/auth';
import { getDrafts, saveDraft, deleteDraft } from '../../../lib/db';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ error: 'Ikke autoriseret.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const drafts = getDrafts();
  return new Response(JSON.stringify({ drafts }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ error: 'Ikke autoriseret.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const data = await request.json();
    const { subject, body, recipient_filter } = data;

    if (!subject || !body) {
      return new Response(JSON.stringify({ error: 'Emne og brødtekst er påkrævet.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const draft = saveDraft(subject, body, recipient_filter || 'all');
    return new Response(JSON.stringify({ success: true, draft }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Der opstod en fejl.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
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
    deleteDraft(id);
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
