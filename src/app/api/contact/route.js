// src/app/api/contact/route.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
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
  const isValidMsg = typeof message === "string" && message.trim().length >= 10;

  if (!isValidName || !isValidEmail || !isValidMsg) {
    return new Response("Bad Request", { status: 400 });
  }

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

    return new Response(null, { status: 200 });
  } catch (err) {
    console.error("POST /api/contact failed:", err);
    return new Response("Server error", { status: 500 });
  }
}
