// src/app/api/contact/route.js
import { Resend } from "resend";

export async function POST(req) {
  // --- basic IP rate limiting (your original logic)
  const ip = req.headers.get("x-forwarded-for") || "0.0.0.0";
  globalThis.__rl = globalThis.__rl || {};
  const now = Date.now();
  const w = globalThis.__rl[ip] || [];
  const recent = w.filter((t) => now - t < 60_000);
  if (recent.length >= 5) {
    return new Response("Too many requests", { status: 429 });
  }
  recent.push(now);
  globalThis.__rl[ip] = recent;

  // --- parse + validate request body
  let body;
  try {
    body = await req.json();
  } catch {
    return new Response("Bad JSON", { status: 400 });
  }

  const { name = "", email = "", message = "" } = body;

  const isValidName = typeof name === "string" && name.trim().length >= 2;
  const isValidEmail =
    typeof email === "string" && /^\S+@\S+\.\S+$/.test(email.trim());
  const isValidMsg =
    typeof message === "string" && message.trim().length >= 10;

  if (!isValidName || !isValidEmail || !isValidMsg) {
    return new Response("Bad Request", { status: 400 });
  }

  // --- build email content
  const subject = `New contact form message from ${name}`;
  const textBody = [
    `Name: ${name}`,
    `Email: ${email}`,
    ``,
    `Message:`,
    message,
    ``,
    `— sent from jordanmontenegrocalla.com/contact`,
    `IP: ${ip}`,
  ].join("\n");

  // --- lazily create Resend client at runtime
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("Missing RESEND_API_KEY at runtime");
    return new Response("Email service not configured", { status: 500 });
  }

  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
      from: "webform@jordanmontenegrocalla.com",
      to: "jordanmontenegroc.99@gmail.com",
      reply_to: email,
      subject,
      text: textBody,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return new Response("Email provider error", { status: 500 });
    }

    // success -> tell frontend "ok"
    return new Response(null, { status: 200 });
  } catch (err) {
    console.error("POST /api/contact failed:", err);
    return new Response("Server error", { status: 500 });
  }
}
