import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase
      .from("exit_offer_events")
      .select("event_name, created_at");

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    const rows = data ?? [];

    const totalViews = rows.filter((r) => r.event_name === "view").length;
    const totalAccepts = rows.filter((r) => r.event_name === "accept").length;
    const totalDeclines = rows.filter((r) => r.event_name === "decline").length;
    const totalCloses = rows.filter((r) => r.event_name === "close").length;

    const acceptRate = totalViews > 0
      ? Number(((totalAccepts / totalViews) * 100).toFixed(2))
      : 0;

    return NextResponse.json({
      ok: true,
      totalViews,
      totalAccepts,
      totalDeclines,
      totalCloses,
      acceptRate,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro ao carregar estatísticas";

    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}