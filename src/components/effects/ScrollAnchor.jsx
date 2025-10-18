"use client";

export default function ScrollAnchor({ to, className = "", children }) {
  const onClick = (e) => {
    e.preventDefault();
    const el = document.getElementById(to);
    if (!el) return;
    // adjust this if your nav height changes
    const OFFSET = 88; // px
    const top = el.getBoundingClientRect().top + window.scrollY - OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    // update hash without jumping
    history.replaceState(null, "", `#${to}`);
  };
  return (
    <a href={`#${to}`} onClick={onClick} className={className}>
      {children}
    </a>
  );
}
