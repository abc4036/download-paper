// Handle OPTIONS (preflight)
export const onRequestOptions = () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
};

// Handle GET
export const onRequest = async ({ request }) => {
  const url = new URL(request.url).searchParams.get("url");
  if (!url) return new Response("Missing ?url", { status: 400 });

  const res = await fetch(url);
  const headers = new Headers(res.headers);
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "*");
  return new Response(res.body, {
    status: res.status,
    headers,
  });
};
