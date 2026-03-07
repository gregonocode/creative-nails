import crypto from "crypto";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import PasswordClient from "./PasswordClient";

function verify(token: string) {
  const secret = process.env.GRAFICO_COOKIE_SECRET!;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;

  const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}

async function getBuildForCounts() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("quiz_counts")
    .select("key,count")
    .like("key", "buildFor:%");

  if (error) throw new Error(error.message);

  const map = new Map<string, number>();
  for (const row of data ?? []) {
    const value = row.key.split(":")[1] ?? "";
    map.set(value, Number(row.count ?? 0));
  }

  const values = ["morar", "alugar", "vender", "planejando"] as const;
  const result = values.map((v) => ({ value: v, count: map.get(v) ?? 0 }));

  const total = result.reduce((acc, r) => acc + r.count, 0);
  const items = result.map((r) => ({
    ...r,
    pct: total > 0 ? Math.round((r.count / total) * 100) : 0,
  }));

  return { total, items };
}

async function getExitOfferStats() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("exit_offer_events")
    .select("event_name");

  if (error) throw new Error(error.message);

  const rows = data ?? [];

  const totalViews = rows.filter((r) => r.event_name === "view").length;
  const totalAccepts = rows.filter((r) => r.event_name === "accept").length;
  const totalDeclines = rows.filter((r) => r.event_name === "decline").length;
  const totalCloses = rows.filter((r) => r.event_name === "close").length;

  const acceptRate =
    totalViews > 0 ? Math.round((totalAccepts / totalViews) * 100) : 0;

  return {
    totalViews,
    totalAccepts,
    totalDeclines,
    totalCloses,
    acceptRate,
  };
}

function PasswordGate() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow">
        <h1 className="text-lg font-semibold">Área protegida</h1>
        <p className="mt-1 text-sm text-slate-600">Digite a senha para ver o gráfico.</p>
        <PasswordClient />
      </div>
    </div>
  );
}

export default async function GraficoPage() {
  const c = await cookies();
  const token = c.get("grafico_auth")?.value;
  const isAuthed = token ? verify(token) : false;

  if (!isAuthed) {
    return <PasswordGate />;
  }

  const [{ total, items }, exitStats] = await Promise.all([
    getBuildForCounts(),
    getExitOfferStats(),
  ]);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* QUIZ */}
        <div className="rounded-2xl bg-white p-6 shadow">
          <h1 className="text-xl font-semibold">Interesse do Quiz (buildFor)</h1>
          <p className="mt-1 text-sm text-slate-600">Total de respostas: {total}</p>

          <div className="mt-6 space-y-3">
            {items.map((it) => (
              <div key={it.value} className="rounded-xl border p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium capitalize">{it.value}</div>
                  <div className="text-sm text-slate-600">
                    {it.count} ({it.pct}%)
                  </div>
                </div>

                <div className="mt-3 h-2 w-full rounded bg-slate-200">
                  <div
                    className="h-2 rounded bg-emerald-500"
                    style={{ width: `${it.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EXIT OFFER */}
        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold">Métrica Exit Offer</h2>
          <p className="mt-1 text-sm text-slate-600">
            Quantas pessoas chegaram no popup de saída e o que fizeram.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <div className="rounded-xl border p-4">
              <div className="text-sm text-slate-500">Views</div>
              <div className="mt-2 text-3xl font-bold text-slate-900">
                {exitStats.totalViews}
              </div>
            </div>

            <div className="rounded-xl border p-4">
              <div className="text-sm text-slate-500">Aceitou oferta</div>
              <div className="mt-2 text-3xl font-bold text-slate-900">
                {exitStats.totalAccepts}
              </div>
            </div>

            <div className="rounded-xl border p-4">
              <div className="text-sm text-slate-500">Saiu da página</div>
              <div className="mt-2 text-3xl font-bold text-slate-900">
                {exitStats.totalDeclines}
              </div>
            </div>

            <div className="rounded-xl border p-4">
              <div className="text-sm text-slate-500">Fechou popup</div>
              <div className="mt-2 text-3xl font-bold text-slate-900">
                {exitStats.totalCloses}
              </div>
            </div>

            <div className="rounded-xl border p-4">
              <div className="text-sm text-slate-500">Taxa de aceite</div>
              <div className="mt-2 text-3xl font-bold text-emerald-600">
                {exitStats.acceptRate}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}