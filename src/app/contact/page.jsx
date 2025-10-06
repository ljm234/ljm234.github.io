"use client";
import { useState } from "react";

export default function Contact(){
  const [ok,setOk]=useState(false);
  async function submit(e){
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name")?.toString()||"",
      email: form.get("email")?.toString()||"",
      message: form.get("message")?.toString()||""
    };
    const res = await fetch("/api/contact",{method:"POST", body:JSON.stringify(payload)});
    if(res.ok) setOk(true);
  }
  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold tracking-tight mb-4">Contact</h1>
      {ok ? (
        <p className="text-green-600">Thanks! I’ll get back to you soon.</p>
      ) : (
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full rounded border px-3 py-2" name="name" placeholder="Name" required/>
        <input className="w-full rounded border px-3 py-2" name="email" type="email" placeholder="Email" required/>
        <textarea className="w-full rounded border px-3 py-2" name="message" rows={5} placeholder="Message" required/>
        <button className="rounded bg-black text-white dark:bg-white dark:text-black px-4 py-2">Send</button>
      </form>
      )}
      <p className="text-xs text-neutral-500 mt-4">No spam; your message isn’t stored on this server.</p>
    </div>
  );
}
