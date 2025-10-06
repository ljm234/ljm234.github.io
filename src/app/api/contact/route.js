export async function POST(req){
  const ip = req.headers.get("x-forwarded-for") || "0.0.0.0";
  // simple rate-limit per IP per minute (in-memory; resets on server restart)
  globalThis.__rl = globalThis.__rl || {};
  const now = Date.now();
  const w = globalThis.__rl[ip] || [];
  const recent = w.filter(t=>now-t<60_000);
  if (recent.length >= 5) return new Response("Too many requests", { status: 429 });
  recent.push(now); globalThis.__rl[ip] = recent;

  const body = await req.json();
  const ok = typeof body.name==="string" && typeof body.email==="string" && typeof body.message==="string";
  if(!ok) return new Response("Bad Request", { status: 400 });

  // For class demo, just log. I will plug email later.
  console.log("CONTACT_MESSAGE", { ip, ...body });
  return new Response(null, { status: 202 });
}
