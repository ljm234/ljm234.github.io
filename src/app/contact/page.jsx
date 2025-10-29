// src/app/contact/page.jsx
"use client";

import { useEffect, useRef, useState } from "react";

/* ---------------- Page ---------------- */

export default function Contact() {
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "ok" | "error"
  const [err, setErr] = useState("");
  const msgRef = useRef(null);

  // Auto-resize message textarea
  useEffect(() => {
    const el = msgRef.current;
    if (!el) return;
    const fit = () => {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 400) + "px";
    };
    fit();
    el.addEventListener("input", fit);
    return () => el.removeEventListener("input", fit);
  }, []);

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setStatus("loading");

    const form = new FormData(e.currentTarget);

    // Honeypot (bots only)
    if ((form.get("company") || "").toString().trim()) {
      setStatus("ok");
      return;
    }

    const payload = {
      name: (form.get("name") || "").toString().trim(),
      email: (form.get("email") || "").toString().trim(),
      message: (form.get("message") || "").toString().trim(),
    };

    // Basic client validation
    if (payload.name.length < 2) {
      setStatus("idle");
      setErr("Please enter your full name.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(payload.email)) {
      setStatus("idle");
      setErr("Please enter a valid email address.");
      return;
    }
    if (payload.message.length < 10) {
      setStatus("idle");
      setErr("A little more detail would help — 10+ characters please.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Network error");
      setStatus("ok");
    } catch {
      setStatus("error");
      setErr("Something went wrong. Mind trying again in a minute?");
    }
  }

  return (
    <div className="relative min-h-[80vh]">
      {/* Animated beach background with click splashes */}
      <BeachFX />

      {/* Foreground card */}
      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center px-4 py-10 sm:py-12 md:py-14">
        <section
          className="w-full animate-fadeUp rounded-3xl border bg-white/70 p-6 shadow-xl backdrop-blur-md dark:bg-neutral-950/60 md:p-10"
          aria-live="polite"
        >
          {/* Header */}
          <header className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              <span className="title-grad">Let’s talk</span>
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-neutral-700 dark:text-neutral-300">
              Short note. Clear goal. We’ll move fast and keep it honest.
            </p>
          </header>

          {/* Form / Success */}
          {status === "ok" ? (
            <SuccessCard />
          ) : (
            <form onSubmit={submit} className="mx-auto mt-6 max-w-xl space-y-4">
              {/* name + email grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" autoComplete="name" required />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>

              {/* message */}
              <div>
                <Label htmlFor="message">Message</Label>
                <textarea
                  ref={msgRef}
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="What do you want to build, measure, or fix?"
                  className="w-full resize-none rounded-xl border px-3 py-2 leading-relaxed outline-none ring-emerald-400/50 focus:ring-2 dark:bg-transparent"
                />
                <div className="mt-1 text-xs text-neutral-500">
                  No spam; not stored on this server permanently.
                </div>
              </div>

              {/* Honeypot */}
              <div className="hidden">
                <input name="company" tabIndex={-1} autoComplete="off" />
              </div>

              {/* Actions (stack on mobile to avoid overflow) */}
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href="mailto:requests@jordanmontenegrocalla.com"
                  className="max-w-full break-words text-sm underline opacity-80 hover:opacity-100"
                >
                  Prefer email? requests@jordanmontenegrocalla.com
                </a>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="relative inline-flex items-center gap-2 self-end rounded-xl bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-700 active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-70 sm:self-auto"
                >
                  <span className="pointer-events-none absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-emerald-400/0 via-sky-400/0 to-indigo-400/0 opacity-0 blur transition group-hover:opacity-40" />
                  {status === "loading" ? (
                    <>
                      <Spinner />
                      Sending…
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="-ml-0.5"
                      >
                        <path d="M22 2L11 13" />
                        <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                      Send
                    </>
                  )}
                </button>
              </div>

              {/* Error note */}
              {err && (
                <p className="text-sm text-rose-600 dark:text-rose-400">{err}</p>
              )}
            </form>
          )}
        </section>
      </div>
    </div>
  );
}

/* ---------------- UI bits ---------------- */

function Field({ label, name, type = "text", autoComplete, required }) {
  const id = `f-${name}`;
  return (
    <div className="block">
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="w-full rounded-xl border px-3 py-2 outline-none ring-emerald-400/50 focus:ring-2 dark:bg-transparent"
      />
    </div>
  );
}

function Label(props) {
  return (
    <label
      {...props}
      className={
        "mb-1 block text-xs font-medium uppercase tracking-wide text-neutral-500 " +
        (props.className || "")
      }
    />
  );
}

function Spinner() {
  return (
    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
  );
}

function SuccessCard() {
  return (
    <div className="mx-auto mt-6 max-w-xl rounded-2xl border p-6 text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-emerald-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <h2 className="mt-3 text-lg font-semibold">Thanks — got it!</h2>
      <p className="mx-auto mt-1 max-w-md text-sm text-neutral-700 dark:text-neutral-300">
        I’ll reply shortly. If it’s urgent, email{" "}
        <a
          className="underline"
          href="mailto:urgent@jordanmontenegrocalla.com"
        >
          requests@jordanmontenegrocalla.com
        </a>
        .
      </p>
      <a
        href="/"
        className="mt-4 inline-flex rounded-lg border px-4 py-2 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900"
      >
        Back to home
      </a>
    </div>
  );
}

/* ---------------- Animated beach background (with water splash) ---------------- */

function BeachFX() {
  const hostRef = useRef(null);

  // Create splash ring + multiple droplets
  const splashAt = (x, y) => {
    const host = hostRef.current;
    if (!host) return;
    const rect = host.getBoundingClientRect();
    const px = x - rect.left;
    const py = y - rect.top;

    // ring
    const ring = document.createElement("span");
    ring.className = "splash-ring";
    ring.style.left = `${px}px`;
    ring.style.top = `${py}px`;
    host.appendChild(ring);
    ring.addEventListener("animationend", () => ring.remove(), { once: true });

    // droplets
    const COUNT = 12;
    for (let i = 0; i < COUNT; i++) {
      const drop = document.createElement("span");
      drop.className = "drop";
      drop.style.left = `${px}px`;
      drop.style.top = `${py}px`;

      // Randomized arc (soft fountain upward then back down)
      const dx = (Math.random() * 140 - 70) | 0; // -70..70 px
      const peak = -(60 + Math.random() * 60) | 0; // -60..-120 px (up)
      const dy = 30 + Math.random() * 80; // 30..110 px (down)
      const size = 4 + Math.random() * 4; // 4..8 px

      drop.style.setProperty("--dx", `${dx}px`);
      drop.style.setProperty("--peak", `${peak}px`);
      drop.style.setProperty("--dy", `${dy}px`);
      drop.style.setProperty("--size", `${size}px`);
      drop.style.setProperty("--time", `${600 + Math.random() * 500}ms`);

      host.appendChild(drop);
      drop.addEventListener("animationend", () => drop.remove(), { once: true });
    }

    // tiny mist
    const MIST = 16;
    for (let i = 0; i < MIST; i++) {
      const dot = document.createElement("span");
      dot.className = "mist";
      dot.style.left = `${px}px`;
      dot.style.top = `${py}px`;

      const dx = (Math.random() * 90 - 45) | 0;
      const dy = (Math.random() * -40) | 0;
      const life = 350 + Math.random() * 250;
      dot.style.setProperty("--dx", `${dx}px`);
      dot.style.setProperty("--dy", `${dy}px`);
      dot.style.setProperty("--time", `${life}ms`);

      host.appendChild(dot);
      dot.addEventListener("animationend", () => dot.remove(), { once: true });
    }
  };

  // Works for mouse + touch
  const onPointerDown = (e) => {
    if (e.touches && e.touches.length) {
      for (const t of e.touches) splashAt(t.clientX, t.clientY);
    } else {
      splashAt(e.clientX, e.clientY);
    }
  };

  return (
    <>
      <div
        ref={hostRef}
        className="fixed inset-0 z-0 overflow-hidden"
        onPointerDown={onPointerDown}
      >
        <div className="sky absolute inset-0" />
        <div className="sun absolute" />
        <div className="ocean absolute left-0 right-0" />
        <div className="wave wave1 absolute left-[-20vw] right-[-20vw]" />
        <div className="wave wave2 absolute left-[-20vw] right-[-20vw]" />
        <div className="shore absolute bottom-0 left-0 right-0" />
        <div className="birds absolute left-0 right-0">
          <span className="bird b1" />
          <span className="bird b2" />
          <span className="bird b3" />
        </div>
      </div>

      <style>{`
        :root { --horizon: 60vh; }

        /* Subtle motion + premium palette */
        .sky { background: linear-gradient(180deg,#cfe9fb 0%,#f3f8ff 48%,#cfe9fb 100%); }
        .sun {
          left: 50%; top: 12vh; width: 34vmin; height: 34vmin; transform: translateX(-50%);
          border-radius: 50%;
          background: radial-gradient(circle at 50% 55%, #ffeaa7 0%, #ffdf86 28%, rgba(255,255,255,0) 62%);
          filter: blur(10px); opacity: .75; animation: sunPulse 8s ease-in-out infinite;
        }
        @keyframes sunPulse { 0%,100%{ transform: translateX(-50%) scale(1)} 50%{ transform: translateX(-50%) scale(1.03)} }

        .ocean {
          top: var(--horizon); height: 40vh;
          background: linear-gradient(180deg, rgba(78,176,201,.55) 0%, rgba(64,165,195,.72) 30%, #0ea5e9 70%, #0b79b2 100%);
          mask-image: linear-gradient(to top, #000 75%, rgba(0,0,0,.5) 92%, transparent 100%);
        }

        .wave {
          height: 22vh; opacity: .65; mix-blend-mode: screen;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,.85), transparent 90%);
          pointer-events: none;
        }
        .wave1 {
          top: calc(var(--horizon) - 1rem);
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='90' viewBox='0 0 240 90'><path d='M0 55 Q30 35 60 55 T120 55 T180 55 T240 55 V90 H0Z' fill='rgba(255,255,255,.60)'/></svg>");
          background-size: 240px 90px; background-repeat: repeat-x;
          animation: waveX 9s linear infinite, bob 6s ease-in-out infinite;
        }
        .wave2 {
          top: calc(var(--horizon) - .6rem); opacity:.5;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='110' viewBox='0 0 300 110'><path d='M0 60 Q37 40 75 60 T150 60 T225 60 T300 60 V110 H0Z' fill='rgba(255,255,255,.45)'/></svg>");
          background-size: 300px 110px; background-repeat: repeat-x;
          animation: waveX2 12s linear infinite, bob 8s ease-in-out infinite; filter: blur(.3px);
        }
        @keyframes waveX  { 0%{background-position:0 0} 100%{background-position:800px 0} }
        @keyframes waveX2 { 0%{background-position:0 0} 100%{background-position:-900px 0} }
        @keyframes bob    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }

        .shore {
          height: 22vh;
          background:
            linear-gradient(180deg,#f6e4bd 0%,#efd3a1 55%,#e6bf86 100%),
            radial-gradient(60vmin 40vmin at 40% -6%, rgba(255,255,255,.7), rgba(255,255,255,0) 60%);
          box-shadow: inset 0 10px 28px rgba(255,255,255,.85);
        }

        .birds { top: 10vh; height: 34vh; pointer-events: none; }
        .bird {
          position:absolute; width:28px; height:14px; opacity:.55;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='28' height='14' viewBox='0 0 28 14'><path d='M1 9 Q8 1 14 7 Q20 1 27 9' fill='none' stroke='white' stroke-width='2' stroke-linecap='round'/></svg>");
          animation: fly linear infinite; filter: drop-shadow(0 1px 1px rgba(0,0,0,.1));
        }
        .b1{ top:6vh;  left:-15%; animation-duration:26s; }
        .b2{ top:11vh; left:-18%; animation-duration:22s; animation-delay:-5s; transform:scale(.9) }
        .b3{ top:15vh; left:-12%; animation-duration:28s; animation-delay:-9s; transform:scale(1.1); opacity:.45 }
        @keyframes fly { 0%{transform:translateX(0)} 100%{transform:translateX(130vw)} }

        /* --- Splash effects --- */

        /* Expanding ring on the surface */
        .splash-ring {
          position:absolute; z-index:50;
          width:8px; height:8px; border-radius:9999px;
          border:2px solid rgba(255,255,255,.95);
          transform:translate(-50%,-50%) scale(1);
          mix-blend-mode: screen; pointer-events:none;
          animation: ring .9s ease-out forwards;
        }
        @keyframes ring {
          0%  { opacity:.9;  transform:translate(-50%,-50%) scale(1) }
          70% { opacity:.35; transform:translate(-50%,-50%) scale(22) }
          100%{ opacity:0;   transform:translate(-50%,-50%) scale(26) }
        }

        /* Water droplets that arc out then fall back down */
        .drop {
          position:absolute; z-index:51;
          width:var(--size,6px); height:var(--size,6px); border-radius:9999px;
          background: radial-gradient(circle,#e6f7ff 10%, #7dd3fc 60%, rgba(255,255,255,.2) 100%);
          filter: drop-shadow(0 1px 1px rgba(0,0,0,.25));
          transform: translate(-50%,-50%);
          animation: dropletPath var(--time,900ms) ease-out forwards;
          mix-blend-mode: screen; pointer-events:none;
        }
        /* approximate parabola via a mid "peak" keyframe */
        @keyframes dropletPath {
          0%   { opacity:.95; transform: translate(-50%,-50%) translate(0,0)    scale(1); }
          45%  { opacity:1;   transform: translate(-50%,-50%) translate(calc(var(--dx) * .5), var(--peak)); }
          100% { opacity:0;   transform: translate(-50%,-50%) translate(var(--dx), var(--dy))  scale(.9); }
        }

        /* Fine mist for extra realism */
        .mist {
          position:absolute; z-index:50;
          width:2px; height:2px; border-radius:9999px;
          background: rgba(255,255,255,.9);
          transform: translate(-50%,-50%);
          animation: mistFly var(--time,450ms) ease-out forwards;
          mix-blend-mode: screen; pointer-events:none;
          filter: blur(.2px);
        }
        @keyframes mistFly {
          0%   { opacity:.9; transform: translate(-50%,-50%) translate(0,0) }
          100% { opacity:0;  transform: translate(-50%,-50%) translate(var(--dx), var(--dy)) }
        }

        /* Title + card entrance */
        .title-grad{
          background-image: linear-gradient(90deg,#22c55e,#60a5fa,#6366f1);
          background-size: 200% 200%;
          -webkit-background-clip:text; background-clip:text; color:transparent;
          animation: gradShift 9s ease-in-out infinite;
        }
        @keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}

        .animate-fadeUp { animation: fadeUp 700ms cubic-bezier(.22,.61,.36,1) both; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }
      `}</style>
    </>
  );
}
