export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/contact' && request.method === 'POST') {
      try {
        const formData = await request.formData();
        const email = formData.get('email');

        // In a real app, you would save this to KV, D1, or send an email.
        // For now, we'll just log it and return a success message.
        console.log('New contact submission:', email);

        return new Response(JSON.stringify({ success: true, message: "Thank you for joining the beta list!" }), {
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (e) {
        return new Response(JSON.stringify({ success: false, error: e.message }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // Otherwise, serve static assets
    return env.ASSETS.fetch(request);
  },
};
