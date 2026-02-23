"use client";

import { useState } from "react";

export default function PasswordClient() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/grafico/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        window.location.reload();
      } else {
        alert("Senha incorreta.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-3">
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        type="password"
        placeholder="Senha"
        className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
      />
      <button
        type="submit"
        disabled={loading || password.length === 0}
        className="w-full rounded-xl bg-emerald-600 px-3 py-2 text-white font-medium hover:bg-emerald-700 disabled:opacity-60"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}